import { useSearchParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
// 
 useEffect(() => {
  if (sessionId) {
    axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
      sessionId,
    });
  }
}, [sessionId]);

 
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>

      <p className="mt-4 text-lg">
        Payment ID: <span className="font-semibold">
          {/* {payment.id} */}

          </span>
      </p>
      <p className="mt-4 text-lg">
        Transaction ID:{" "}
        <span className="font-semibold">
          {/* {payment.payment_intent} */}
          </span>
      </p>

      <p className="mt-2 text-lg">
        Amount Paid:{" "}
        <span className="font-semibold">
          {/* ${payment.amount_total / 100} */}
          
          </span>
      </p>

      <p className="mt-2 text-md text-gray-600">
        Status:
         {/* {payment.payment_status} */}
      </p>
    </div>
  );
};

export default PaymentSuccess;
