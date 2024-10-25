import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/MakePayment.module.css";

const MakePayment = () => {
  const router = useRouter();
  const { selectedSeats, farePerSeat } = router.query;

  const [paymentMethod, setPaymentMethod] = useState("");
  const totalFare = selectedSeats ? selectedSeats.split(",").length * farePerSeat : 0;

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    // Simulate payment process
    alert("Payment successful!");

    // Redirect to homepage after payment
    router.push("/homepage");
  };

  return (
    <div className={styles.container}>
      <h1>Make Payment</h1>
      <p>Total Fare: {totalFare} BDT</p>

      <div className={styles.paymentMethods}>
        <label className={styles.labelclass}>
          <input
            type="radio"
            value="CreditCard"
            checked={paymentMethod === "CreditCard"}
            onChange={() => setPaymentMethod("CreditCard")}
          />
          Credit Card
        </label>

        <label className={styles.labelclass}>
          <input
            type="radio"
            value="Bkash"
            checked={paymentMethod === "Bkash"}
            onChange={() => setPaymentMethod("Bkash")}
          />
          Bkash
        </label>

        <label className={styles.labelclass}>
          <input
            type="radio"
            value="Nagad"
            checked={paymentMethod === "Nagad"}
            onChange={() => setPaymentMethod("Nagad")}
          />
          Nagad
        </label>
      </div>

      <button className={styles.payButton} onClick={handlePayment}>
        Make Payment
      </button>
    </div>
  );
};

export default MakePayment;
