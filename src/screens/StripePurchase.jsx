import "../styles/screens/Credits.css";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "../components/Credits/CheckoutForm";
import { checkIfSignedIn } from "../utils/signin";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/loading/LoadingScreen";

// Load Stripe outside the component render
const stripePromise = loadStripe("pk_test_51H0aqaBhICa9al4eaK99VDD79MRIi4xWVUMTu5VEcW33w26Nv65sUq3pJ9dliFi7bq7OIwfeMmAFUJCQM7BV73iK00IcHwU0ti");

export default function StripePurchase() {
  const SERVER_URI = import.meta.env.VITE_SERVER_URI
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(50); // Default amount
  const [showPaymentForm, setShowPaymentForm] = useState(true); // New state for tracking the form
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user !== undefined) {
      checkIfSignedIn(user);
      setLoading(false);
    }
  }, [user]);

  const createPaymentIntent = () => {
    if (user !== undefined) {
      checkIfSignedIn(user);
      setLoading(false);

      axios.post(SERVER_URI + "/payment/intent", { amount }, { withCredentials: true })
        .then((res) => res.data)
        .then((data) => {
          setClientSecret(data.clientSecret);
          setShowPaymentForm(false); // Switch to Stripe form
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleBackClick = () => {
    setShowPaymentForm(true); // Switch back to the payment form
  };

  const appearance = {
    theme: 'flat',
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="credits-page-container">
      {
        showPaymentForm ? 
        <div className="payment-form">
          <label htmlFor="amount-input">Enter Payment Amount:</label>
          <input 
            type="number" 
            id="amount-input" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
          />
          <button onClick={createPaymentIntent}>Proceed to Payment</button>
        </div>
        :
        <div className="stripe-form-container">
          <button className="back-button" onClick={handleBackClick}>Back</button>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      }
    </div>
  );
}
