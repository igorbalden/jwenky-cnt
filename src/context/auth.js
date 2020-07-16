import React, { useState, useReducer } from "react";
import { createContext, useContext } from 'react';
import jwt from "jsonwebtoken";
import config from "../components/config/auth";
import axios from "axios";


export const AuthContext = createContext();


export function useAuth() {
  return useContext(AuthContext);
};


export const AuthState = (props)=> {
  const [cxloading, setCxloading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [validJwt, setValidJwt] = useState(true);
  const [authObj, dispatch] = useReducer(reducer, { user: {} });


  function refreshToken() {
    return new Promise((resolve, reject) => {
      setRefreshing(true);
      axios(process.env.REACT_APP_SERVER+ '/auth/refresh_token', {
        method: "post",
        withCredentials: true,
      })
      .then((r) => {
        setRefreshing(false);
        // Check resp
        if (r.data.msg === 'Token Refreshed') {
          sessionStorage.setItem('accessToken',
            r.headers.authorization.split(' ')[1]);
          dispatch({type: 'setUser', payload: r.data.user});
          return resolve(r.data.user);
        }
      })
      .catch(err => {
        setRefreshing(false);
        dispatch({type: 'clean'});
        return reject('Refresh error');
      });
    });
  }


  function updValidJwt() {
    const expr = jwt.decode(sessionStorage.accessToken).exp;
    const iatm = jwt.decode(sessionStorage.accessToken).iat;
    const validPeriod = expr - iatm - config.time_diff_allowance;
    setValidJwt(true);
    setTimeout(()=> {
      setValidJwt(false);
    }, validPeriod * 1000)
    return;
  }


  function reducer(authObj, action) {
    switch (action.type) {

      case 'clean':
        sessionStorage.setItem('AuthUser', {});
        return {user: {}};

      case 'setUser':
        updValidJwt();
        sessionStorage.setItem('AuthUser', JSON.stringify(action.payload));
        return {user: action.payload};

      case 'refresh':
        var refr_user = {};
        refreshToken()
        .then((usr) => {
          refr_user = usr;
        })
        .catch((err)=> {});
        return {user: refr_user};

      case 'checkValidToken':
        if (! validJwt) {refreshToken();}
        const us = sessionStorage.getItem('AuthUser');
        return {user: JSON.parse(us)};

      default:
        throw new Error();
    }
  }


  return (
    <AuthContext.Provider value={
      { 
        refreshing: refreshing, setRefreshing: setRefreshing,
        cxloading: cxloading, setCxloading: setCxloading,
        authObj: authObj, dispatch: dispatch,
      } 
    }>
      {props.children}
    </AuthContext.Provider>
  );  
};
