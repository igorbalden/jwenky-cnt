import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/auth";


function PrivateRoute({ component: Component, ...rest }) {
  const { authObj } = useAuth();
  
  return (
    <Route {...rest} render = {
      props => (authObj.user && 
                /^\d+$/.test(authObj.user.id) && 
                authObj.user.id > 0) 
      ? (
        <Component {...props} />
      )
      : (
        <Redirect
          to={{ pathname: "/auth/login", state: { referer: props.location } }}
        />
      )
    } />
  );
  
}

export default PrivateRoute;