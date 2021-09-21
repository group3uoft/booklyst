import React, { useState, useEffect } from "react";
import { QUERY_CHECKOUT } from '../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export default function Donate() {
  const [ formState, setFormState ] = useState({ amount: ''});
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({...formState, [name]: value});
    console.log(formState)
  }

  function submitCheckout(e) {
    e.preventDefault();
    getCheckout({
      variables: { donate: 20.5 }
    });
  } 

  useEffect(() => {
    if (data) {
      console.log(data)
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  console.log(data)

  return (
    <div className="body-container d-flex flex-column justify-content-center">
      <form onSubmit={submitCheckout} id="donate-form">
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Donation amount</label>
            <input onChange={handleChange} name="amount" className="form-control" id="amount" value={formState.amount} />
          </div>
          <button type="submit" className="btn btn-theme">Donate</button>
        </form>
    </div>
  );
}