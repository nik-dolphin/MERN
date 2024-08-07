import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout/success",
      },
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Payment succeeded!");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-5/6">
      <form onSubmit={handleSubmit} className="max-w-xl w-full">
        <PaymentElement />
        <button
          disabled={!stripe || isLoading}
          type="submit"
          className="mt-4 bg-green-1 hover:bg-green-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? "Processing..." : "Submit"}
        </button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default CheckoutForm;
