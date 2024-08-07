import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutForm from "./checkout-form";

const stripePromise = loadStripe(
  "pk_test_51O2taySFqpxxUhxzi9BYi8iuJlrsiK5JH1pZmCxTpXX8oiGvqUp9W9kCP4R3ambyfhRZbB1P0mN3H46KoRLzkm4W00f2Zyk8wL"
);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const cartData = useSelector((state) => state.cartData);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch(
          "https://api.stripe.com/v1/payment_intents",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`,
            },
            body: new URLSearchParams({
              amount: calculateOrderAmount(cartData.items).toString(),
              currency: "inr",
              description: "Description of the goods or services",
              "shipping[name]": "Nikunj",
              "shipping[address][line1]": "Ahmedabad",
              "shipping[address][postal_code]": "380060",
              "shipping[address][city]": "Ahmedabad",
              "shipping[address][state]": "Gujarat",
              "shipping[address][country]": "IN",
            }),
          }
        );

        const data = await response.json();
        setClientSecret(data.client_secret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, [cartData]);

  const calculateOrderAmount = (items) => {
    // Replace this with a real calculation of the total amount
    return 1400;
  };

  const options = {
    clientSecret,
  };

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
