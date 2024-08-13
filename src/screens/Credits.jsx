import "../styles/screens/Credits.css";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "../components/Credits/CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_51H0aqaBhICa9al4eaK99VDD79MRIi4xWVUMTu5VEcW33w26Nv65sUq3pJ9dliFi7bq7OIwfeMmAFUJCQM7BV73iK00IcHwU0ti");
export default function Credits() {
  const [clientSecret, setClientSecret] = useState("");

useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios.post("http://localhost:3000/payment/intent", { amount: 50 }, { withCredentials: true })
        .then((res) => res.data)
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) => {
            console.log(error)
        });
}, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="page-container">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}