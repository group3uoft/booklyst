import React, { useState, useEffect } from "react";
import { QUERY_CHECKOUT } from '../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import stripeImg from '../assets/images/stripe-badge-white.png'

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export default function Donate() {
  const [ formState, setFormState ] = useState({ amount: ''});
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({...formState, [name]: value});
  }

  function submitCheckout(e) {
    e.preventDefault();
    getCheckout({
      variables: { donate: parseFloat(formState.amount) }
    });
  } 

  useEffect(() => {
    if (data) {
      localStorage.setItem('donationAmount', formState.amount);
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  return (
    <div className="container p-3 p-lg-5 donation-card">
      <div className="donate-icon text-center"><i className="fas fa-donate"></i></div>
      <h1 className="mb-3 mb-lg-5 text-center">Donate</h1>
      <p className="mx-3 fs-3">Your donation gives us the flexibility to rapidly respond in the most effective way to help debug issues and impliment new features and functionalities!</p>
      <div className="card d-flex flex-column p-lg-4 p-3">
      <form onSubmit={submitCheckout} id="donate-form">
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Donation amount</label>
            <input onChange={handleChange} name="amount" className="form-control" id="amount" value={formState.amount} />
          </div>
          <button type="submit" className="btn btn-theme">Donate</button>
        </form>
      </div>
      <div className="container my-5 d-flex flex-column align-items-center px-0">
        <img src={stripeImg} className="mx-0" style={{maxWidth: '300px'}} alt="" />
        <p className="my-4">The payment will be processed through stripe, a secure payment gateway.</p>
      </div>
    </div>
  );
}