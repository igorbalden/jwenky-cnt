import React from "react";
import Nav from "../partials/Nav";
import Spinner from '../partials/Spinner';
import { useAuth } from "../context/auth";


export default function Default(props) {
  const {cxloading} = useAuth();
  const {refreshing} = useAuth();
  let loading = cxloading || refreshing;
  
  return (
    <div>
      <Nav />
      {props.content}
      {Spinner(loading)}
    </div>
  );
}
