import React, {useState, useEffect} from "react";
import axios from "axios";
import {useAuth} from '../../context/auth';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button } from '../../style/AuthForms';
import Default from "../../layouts/Default";
import Messages from "../../partials/Messages";


function ResetPassword(props) {
  const [msg, setMsg] = useState('');
  const [err_msg, setErr_msg] = useState('');
  const [key, setKey] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { cxloading, setCxloading, refreshing } = useAuth();


  useEffect(() => {
    const qr = window.location.search.slice(1).split('&');
    for (let i in qr) {
      if (qr[i].split('=')[0] === 'key') {
        setKey(qr[i].split('=')[1]);
      }
      if (qr[i].split('=')[0] === 'email') {
        setEmail(qr[i].split('=')[1]);
      }
    }
  }, [key, email]);

  
  function postReset() {
    setMsg('');
    setErr_msg('');
    if (!password || password !== password2) {
      setMsg('');
      setErr_msg("Passwords empty or don't match!");
      return false;
    }
    setCxloading(true);
    axios.post(process.env.REACT_APP_SERVER+ "/password/resetPassword", {
      key: key,
      email: email,
      password: password,      
    }, {
      withCredentials: true
    }).then(result => {
      setCxloading(false);
      if (result.data.msg !== 'Password reset successful.') {
        let error = '';
        for (let i in result.data.errors) {
          error += result.data.errors[i].msg+ ' ';
        }
        setErr_msg(error);
        setMsg('');
      } else {
        setErr_msg('');
        setMsg(result.data.msg);
        setPassword('');
        setPassword2('');
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

  // Content
  const page = (
    !cxloading
    ?
    <Card>
      <div>Reset Password.</div>
      <Messages msg={msg} err_msg={err_msg} />
      <Form>
        <Input type="password" value={password} 
          onChange={e => {setPassword(e.target.value);}} 
          placeholder="new password" />
        <Input type="password" value={password2} 
          onChange={e => {setPassword2(e.target.value);}} 
          placeholder="new password again" />
        <Button onClick={postReset}>Reset</Button>
      </Form>
      <div>
        Back To <Link to="/auth/login">Login</Link> Page
      </div>
    </Card>
    : ''
  );

  return <Default content={page} />
}

export default ResetPassword;

