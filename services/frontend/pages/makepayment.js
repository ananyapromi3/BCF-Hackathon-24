import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/MakePayment.module.css";

const MakePayment = () => {
  const router = useRouter();
  //   const { selectedSeats, farePerSeat } = router.query;
  const { userId, trainId, cabinType, selectedSeats } = router.query;
  const farePerSeat = 500;

  const [paymentMethod, setPaymentMethod] = useState("");
  const totalFare = selectedSeats
    ? selectedSeats.split(",").length * farePerSeat
    : 0;

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    const bookingData = {
      user_id: userId,
      train_id: trainId,
      cabin_type: cabinType,
      seats: selectedSeats.split(","),
    };

    // try {
    // Send a POST request to book the ticket
    //   const response = await fetch("http://localhost:4004/api/booking/book", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(bookingData),
    //   });

    //   const result = await response.json();

    //   if (response.ok) {
    // Simulate payment process
    alert("Payment successful!");

    // Redirect to homepage after payment
    router.push("/homepage");
    //   } else {
    //     alert(result.message || "Payment failed, please try again.");
    //   }
    // } catch (error) {
    //   console.error("Error making payment:", error);
    //   alert("An error occurred while processing your payment.");
    // }
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
