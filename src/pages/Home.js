import React from "react";
import Default from "../layouts/Default";


function Home(props) {
  
  const page = (
    <div>
      Home Page
      <p>
        Boilerplate code
      </p>
    </div>
  );

  return <Default content={page} />
}

export default Home;