import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentIntentId = queryParams.get("payment_intent");
  const amountReceived = queryParams.get("amount_received");
  return (
    <div className="w-full flex flex-col justify-center items-center h-5/6">
      <h1 className="text-green-1">Payment Successful</h1>
      <p>Payment Intent ID: {paymentIntentId}</p>
      <p>Amount Received: ${amountReceived / 100}</p>
      <button
        onClick={() => navigate("/")}
        className=" bg-green-1 hover:bg-green-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Back to Home
      </button>
    </div>
  );
};

export default SuccessPayment;
