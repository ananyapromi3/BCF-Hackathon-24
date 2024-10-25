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

  const handleMethodSelection = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Make Payment</h1>
        <p className={styles.totalFare}>
          Total Fare: <strong>{totalFare} BDT</strong>
        </p>

        <div className={styles.paymentMethods}>
          <button
            className={`${styles.paymentButton} ${
              paymentMethod === "CreditCard" ? styles.active : styles.inactive
            }`}
            onClick={() => handleMethodSelection("CreditCard")}
          >
            <img src="/creditcard3.png" alt="Credit Card" />
          </button>

          <button
            className={`${styles.paymentButton} ${
              paymentMethod === "Bkash" ? styles.active : styles.inactive
            }`}
            onClick={() => handleMethodSelection("Bkash")}
          >
            <img src="/bkash.png" alt="Bkash" />
          </button>

          <button
            className={`${styles.paymentButton} ${
              paymentMethod === "Nagad" ? styles.active : styles.inactive
            }`}
            onClick={() => handleMethodSelection("Nagad")}
          >
            <img src="/nagad.png" alt="Nagad" />
          </button>
        </div>

        <button className={styles.payButton} onClick={handlePayment}>
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default MakePayment;
