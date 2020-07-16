import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthState } from "./context/auth";
import './index.css';


ReactDOM.render(
  <AuthState>
    <App />
  </AuthState>, 
  document.getElementById('root')
);
