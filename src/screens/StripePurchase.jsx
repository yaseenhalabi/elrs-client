import "../styles/screens/StripePurchase.css";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import LoadingScreen from '../components/Loading/LoadingScreen';
import CheckoutForm from "../components/StripePurchase/CheckoutForm";
import { checkIfSignedIn } from "../utils/signin";
import { useSelector } from "react-redux";

// Load Stripe outside the component render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function StripePurchase() {
  const SERVER_URI = import.meta.env.VITE_SERVER_URI
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [amountOfCharacters, setAmountOfCharacters] = useState(10000); // Default amount
  const amountPayment = amountOfCharacters * 0.00009;
  const amountPaymentInCents = amountPayment * 100;
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
    if (amountPayment < 5) {
      axios.post(SERVER_URI + "/payment/intent", { amount: amountPaymentInCents }, { withCredentials: true })
        .then((res) => res.data)
        .then((data) => {
          setClientSecret(data.clientSecret);
          setShowPaymentForm(false); // Switch to Stripe form
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      alert("Minimum payment is $5");
    }
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
          <label htmlFor="amount-input">Amount of characters:</label>
          <input 
            type="number" 
            id="amount-input" 
            value={amountOfCharacters} 
            onChange={(e) => setAmountOfCharacters(e.target.value)} 
          />
          <div>About {Math.round(amountOfCharacters/1000)} minutes of audio</div>
          <div>Cost: ${amountPayment.toFixed(2)}</div> {/* Round to nearest cent */}
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
