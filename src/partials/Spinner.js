import React from "react";
import "./Spinner.css";


export default function Spinner(loading) {  

  return (
    loading 
    ?
    <div className="css-spinner">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div> 
    : ''
  );
}
