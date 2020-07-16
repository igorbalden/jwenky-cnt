import React, { useEffect } from "react";
import { useAuth } from "./context/auth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './components/auth/PrivateRoute';
import PrivateRouteAdmin from './components/auth/PrivateRouteAdmin';
import Home from "./pages/Home";
import More from "./pages/More";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/auth/Login";
import Signup from './pages/auth/Signup';
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Page404 from './pages/Page404';


function App(props) {
  const { dispatch } = useAuth();

  // If the user reloads (F5) the page, try to refresh accessToken
  // The accessToken has been lost from sessionStorage
  useEffect(() => {
    dispatch({ type: 'refresh' });
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/signup" component={Signup} />
        <Route path="/auth/forgot-password" component={ForgotPassword} />
        <Route path="/auth/reset-password" component={ResetPassword} />
        <PrivateRoute path="/more" component={More} />
        <PrivateRouteAdmin path="/admin/dashboard" component={Dashboard} />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
}

export default App;