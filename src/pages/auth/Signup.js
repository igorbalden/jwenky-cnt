import React, {useState} from "react";
import axios from "axios";
import {useAuth} from '../../context/auth';
import { Link, Redirect } from 'react-router-dom';
import { Card, Form, Input, Button } from '../../style/AuthForms';
import Default from "../../layouts/Default";
import Messages from "../../partials/Messages";


function Signup(props) {
  const [msg, setMsg] = useState('');
  const [err_msg, setErr_msg] = useState('');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { authObj, cxloading, setCxloading, refreshing } = useAuth();
  let referer = (props.location.state && 
                props.location.state.referer.pathname) 
                || '/more';
  
  function postRegister() {
    setCxloading(true);
    axios.post(process.env.REACT_APP_SERVER+ "/auth/register", {
      name: name,
      email: email,
      password: password,      
      password2: password2,
    }, {
      withCredentials: true
    }).then(result => {
      setCxloading(false);
      if (result.data !== 'User created.') {
        let error = '';
        for (let i in result.data.errors) {
          error += result.data.errors[i].msg+ ' ';
        }
        setErr_msg(error);
        setMsg('')
      } else {
        setErr_msg('');
        setMsg('User created.');
      }
      return true;
    }).catch(err => {
      setCxloading(false);
      setErr_msg("Server error!");
      setMsg('')
    });
  }
              
  
  // Show spinner
  if (cxloading || refreshing) {
    return <Default />
  }

  // Redirect if logged in
  if (authObj && /^\d+$/.test(authObj.user.id) && authObj.user.id > 0) {
    return (
      <Redirect to={{ pathname: referer, 
                    state: { referer: props.location } }}
      />
    );
  }

  // Content
  const page = (
    !cxloading
    ?
    <Card>
      <Messages msg={msg} err_msg={err_msg} />
      <Form>
        <Input type="text" value={name} onChange={e => {
            setName(e.target.value);
          }} placeholder="name" />
        <Input type="email" value={email} onChange={e => {
            setEmail(e.target.value);
          }} placeholder="email" />
        <Input type="password" value={password} onChange={e => {
            setPassword(e.target.value);
          }} placeholder="password" />
        <Input type="password" value={password2} onChange={e => {
            setPassword2(e.target.value);
          }} placeholder="password again" />
        <Button onClick={postRegister}>Sign Up</Button>
      </Form>
      <Link to="/auth/login">Already registered?</Link>
    </Card>
    : ''
  );

  return <Default content={page} />
}

export default Signup;

