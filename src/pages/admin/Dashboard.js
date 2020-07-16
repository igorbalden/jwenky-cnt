import React, {useEffect, useState} from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Default from "../../layouts/Default";


function Dashboard(props) {
  const { cxloading, setCxloading } = useAuth();
  const { dispatch } = useAuth();
  // Prevent page flashing in the beginning
  let [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const loadPage = async () => {
      setCxloading(true);
      await dispatch({type: 'checkValidToken'});
      axios(process.env.REACT_APP_SERVER+ "/users/dashboard", {
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
        if (err.response.status === 403) {
          return props.history.goBack();
        } else {
          dispatch({type: 'clean'});
        }
      });
    }
    loadPage();

  }, [dispatch, setShowPage, setCxloading, props.history]);
  
  // Show spinner
  if (cxloading) {
    return <Default />
  }

  const page = (
    // showPage
    showPage 
    ?
    <div>
      <div>Admin Page</div>
      <div style={{wordBreak: "break-all"}}>
        <p>AuthUser: {sessionStorage.AuthUser} </p>
      </div>
    </div>
    : ''
  );

  return <Default content={page} />
}

export default Dashboard;

