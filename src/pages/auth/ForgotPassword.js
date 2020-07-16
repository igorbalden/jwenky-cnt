import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Card, Form, Input, Button } from "../../style/AuthForms";
import { useAuth } from "../../context/auth";
import Default from "../../layouts/Default";
import Messages from "../../partials/Messages";


function ForgotPassword(props) {
  const [msg, setMsg] = useState('');
  const [err_msg, setErr_msg] = useState('');
  const [email, setEmail] = useState("");
  const { cxloading, setCxloading, refreshing } = useAuth();
  
  function postForgot() {
    setErr_msg('');
    setMsg('');
    setCxloading(true);
    axios.post(process.env.REACT_APP_SERVER+ "/password/forgotPassword", {
      email: email,
    }, {
      withCredentials: true
    }).then(response => {
      setCxloading(false);
      if (response && response.data && response.data.err_msg) {
        setErr_msg(response.data.err_msg);
        setMsg('');
      } else {
        setMsg(response.data.msg)
        setErr_msg('');
      }
    }).catch(err => {
      if (err.response && err.response.data && err.response.data.err_msg) {
        setErr_msg(err.response.data.err_msg);
        setMsg('');
      } else {
        setErr_msg("Server error!");
        setMsg('');
      }
      setCxloading(false);
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
      <div>Request Password Reset.</div>
      <Messages msg={msg} err_msg={err_msg} />
      <Form>
        <Input type="email" value={email} onChange={e => {
            setEmail(e.target.value);
          }} placeholder="Your email" />
        <Button onClick={postForgot}>Send</Button>
      </Form>
      <div>
        Back To <Link to="/auth/login">Login</Link> Page
      </div>
    </Card>
    : ''
  );

  return <Default content={page} />
}

export default ForgotPassword;
