import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/auth";


function PrivateRouteAdmin({ component: Component, ...rest }) {
  const { authObj } = useAuth();

  return (
    <Route {...rest} render = {
      props => (authObj.user && 
                /^\d+$/.test(authObj.user.id) && 
                authObj.user.id > 0) 
      ? (
          (authObj.user.is_admin)
          ? (
            <Component {...props} />
          ) 
          : (
            <Redirect
              to={{ pathname: props.history.goBack(), 
                    state: { referer: props.location } }}
            /> 
          )
        )
      : (
        <Redirect
          to={{ pathname: "/auth/login", state: { referer: props.location } }}
        />
      )
    } />
  );
}

export default PrivateRouteAdmin;