import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { ADD_DONATION } from '../utils/mutations';

export default function Success() {   
  const [redirctTo, setRedirctTo] = useState(false);
  const [ addDonation, { error }] = useMutation(ADD_DONATION);

  useEffect(() => {
  const renderDonation = async () => {
    const amount = localStorage.getItem('donationAmount');
    let params = (new URL(document.location)).searchParams;
    let session = params.get('session_id');
    try {
      await addDonation({
        variables: { donationData: {amount: amount, session: session || ""} }
      });
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
    setRedirctTo(true);
    }, 3000);
  }
  renderDonation();
}, []);

  if (redirctTo) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="container">
        <h1 className="fs-1 text-center mb-3 mb-lg-5">Success!</h1>
        <h3 className="fs-3 text-center">
          Thank you for supporting the website!
        </h3>
        <h3 className="fs-3 text-center">
          You will now be redirected to the homepage
        </h3>
      </div>
    )
  }    
}