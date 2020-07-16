import React, {useState, useEffect} from "react";
import axios from "axios";
import { useAuth } from "../context/auth";
import Default from "../layouts/Default";


export default function More() {
  const { cxloading, setCxloading } = useAuth();
  const { dispatch } = useAuth();
  // Prevent page flashing in the beginning
  let [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const loadPage = async () => {
      setCxloading(true);
      await dispatch({type: 'checkValidToken'});
      axios(process.env.REACT_APP_SERVER+ "/users/more", {
        method: "get",
        withCredentials: true,
        headers: {authorization: 
          "Bearer "+ sessionStorage.getItem('accessToken')}
      })
      .then(response => {
        setCxloading(false);
        return setShowPage(true);
      })
      .catch((err) => {
        setCxloading(false);
        dispatch({type: 'clean'});
      });
    }
    loadPage();

  }, [dispatch, setShowPage, setCxloading]);
  
  // Show spinner
  if (cxloading) {
    return <Default />
  }

  const page = (
    // showPage
    showPage 
    ?
    <div>
      <p>A protected page. No content. </p>
      <p>{Date(Date.now())}</p>
    </div>
    : ''
  );
  
  return <Default content={page} />
};
