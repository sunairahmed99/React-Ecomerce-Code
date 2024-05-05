import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "../Card/card.css";
import {useDispatch, useSelector } from "react-redux";
import {orderdata } from "../Order/orderSlice";
import { fetchdelAllCartdataafterorder } from "../Cart/cartSlice";
import { Authdata } from "../Auth/authSlice";

// / Make sure to call loadStripe outside of a component’s render to avoid
// / recreating the Stripe object on every render.
// / This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51Mh7VzHd2K7SQ05w5PvuvQG1jj2PmpmRsnKCVW2elVtm8iBhriC8kMqS5C9lQxHvdZ6N3n84Pjivr07dJTGGe9rb001V6576MS");

export default function Card() {
  const [clientSecret, setClientSecret] = useState("");
  const {Order} = useSelector(orderdata)
  let {loginUser} = useSelector(Authdata)
  const dispatch = useDispatch()
  console.log(Order.data)




  useEffect(() => {
    // / Create PaymentIntent as soon as the page loads
    if(Order.data !== undefined ){
        console.log('pillay')

        fetch("/create-payment-intent", {
        
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items:Order.data}),
      meta:{
        order_code:Order.ordercode
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.clientSecret)
        setClientSecret(data.clientSecret)
         dispatch(fetchdelAllCartdataafterorder(loginUser.id))
      });

    }

  }, [Order,dispatch,loginUser.id]);

// /   useEffect(()=>{

// /     dispatch(fetchgetOrderToken(ordercode))

// /   },[dispatch,ordercode])




  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="stripe">
        
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm/>
        </Elements>
      )}
    </div>
  );
}
