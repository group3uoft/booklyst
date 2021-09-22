import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { ADD_DONATION } from '../utils/mutations';

export default function Success() {   
  const [redirctTo, setRedirctTo] = useState(false);
  const [ addDonation, { error }] = useMutation(ADD_DONATION);

  useEffect(async () => {
    /*(async () => {
      const amount = localStorage.getItem('donationAmount');

      try {
        const response = await addDonation({
          variables: { donationData: {amount: amount, session: "abcdefg"} }
        });
        console.log(response)
      } catch (e) {
        console.error(e);
      }

      setTimeout(() => {
        setRedirctTo(true);
      }, 3000);
    })();
  });*/
  const amount = localStorage.getItem('donationAmount');
  let params = (new URL(document.location)).searchParams;
  let session = params.get('session_id');
  //console.log(amount, session)
  try {
    const response = await addDonation({
      variables: { donationData: {amount: amount, session: session || ""} }
    });
    console.log(response)
  } catch (e) {
    console.error(e);
  }

  setTimeout(() => {
    setRedirctTo(true);
  }, 3000);

}, []);

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