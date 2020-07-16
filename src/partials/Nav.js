import React from 'react';
import axios from "axios";
import { useAuth } from "../context/auth";
import { Button } from "../style/AuthForms";
import {NavLink} from 'react-router-dom';
import "./Nav.css";


export default function Nav() {
  var uid = sessionStorage.getItem('Uid');
  const { refreshing, authObj, dispatch } = useAuth();

  const logOut = () => {
    axios(process.env.REACT_APP_SERVER+ "/auth/logout", {
      method: "post",
      withCredentials: true,
    })
    .then((r) => {
      dispatch({type: 'clean'});
    });
    uid = authObj.user.id;
    sessionStorage.setItem('Uid', uid);
    sessionStorage.setItem('accessToken', null);
  };
  
  function logOutAll() {
    axios.post(process.env.REACT_APP_SERVER+ "/auth/logoutAll", {
      uid
    }).then(result => {
      sessionStorage.setItem('Uid', null);
      uid = null;
      dispatch({type: 'clean'});
    });
  }
  
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/more">More</NavLink></li>
        <li><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
      </ul>

      { !refreshing && (
          (authObj.user && authObj.user.id) 
          ?
          <Button onClick={logOut}>Logout</Button>
          :
          <NavLink to="/auth/login">Login</NavLink>
        )
      }

      { !refreshing && (
          (uid && uid !== 'null' && !authObj.user.id)
          ? <Button className="logoutAll" onClick={logOutAll}>
            Logout - All Sessions</Button>
          : ''
        )
      }
    </nav>
  );
  
};
