import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { Card, Form, Input, Button } from "../../style/AuthForms";
import { useAuth } from "../../context/auth";
import Default from "../../layouts/Default";
import Messages from "../../partials/Messages";


function Login(props) {
  const [msg] = useState('');
  const [err_msg, setErr_msg] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authObj, dispatch,
    cxloading, setCxloading, refreshing } = useAuth();
  let referer = (props.location.state &&
    props.location.state.referer.pathname)
    || '/more';

  function postLogin() {
    setCxloading(true);
    axios.post(process.env.REACT_APP_SERVER + "/auth/login", {
      email: email,
      password: password,
    }, {
      withCredentials: true
    }).then(result => {
      setCxloading(false);
      sessionStorage.setItem('accessToken',
        result.headers.authorization.split(' ')[1]);
      dispatch({ type: 'setUser', payload: result.data.user });
    }).catch(err => {
      if (err.response && err.response.data && err.response.data.error_msg) {
        setErr_msg(err.response.data.error_msg);
      } else {
        setErr_msg("Server error!");
      }
      setCxloading(false);
    });
  }

  // Show spinner
  if (cxloading || refreshing) {
    return <Default />
  }

  // Redirect if logged in
  if (authObj && /^\d+$/.test(authObj.user.id) && authObj.user.id > 0) {
    return (
      <Redirect to={{
        pathname: referer,
        state: { referer: props.location }
      }}
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
          <Input type="email" value={email} onChange={e => {
            setEmail(e.target.value);
          }} placeholder="email" />
          <Input type="password" value={password} onChange={e => {
            setPassword(e.target.value);
          }} placeholder="password" />
          <Button onClick={postLogin}>Sign In</Button>
        </Form>
        <Link to="/auth/signup">Don't have an account?</Link>
        <Link to="/auth/forgot-password">Forgot Password?</Link>
      </Card>
      : ''
  );

  return <Default content={page} />
}

export default Login;
