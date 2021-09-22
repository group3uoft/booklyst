import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from '@apollo/client';

export default function Success() {
   
  const [redirctTo, setRedirctTo] = useState(false);
  useEffect(() => {
    (() => {
      setTimeout(() => {
        setRedirctTo(true);
      }, 3000);
    })();
  });

  if (redirctTo) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <h1>Success!</h1>
        <h2>
          Thank you for supporting the website!
        </h2>
        <h2>
          You will now be redirected to the homepage
        </h2>
      </div>
    )
  }    
}