import React from "react";
import NoNav from "../layouts/NoNav";


function Page404() {
  
  const page = (
    <div>
      <h2>404 error. Page not found!</h2>
      <h4>Go to <a href="/">Home Page</a></h4>
    </div>
  );

  return <NoNav content={page} />
}

export default Page404;
