// // src/controllers/bookingController.js
// import { Train } from "../models/Train.js";
// import { Booking } from "../models/Booking.js";

// export const bookTicket = async (req, res) => {
//   const { user_id, train_id, cabin_type, seats } = req.body;

//   try {
//     // Find the train and check if the seat is available
//     const train = await Train.findById(train_id);

//     if (!train) {
//       return res.status(404).json({ message: "Train not found" });
//     }

//     // Find the cabin
//     const cabin = train.cabins.find(
//       (c) => c.cabin_type.toString() === cabin_type
//     );

//     if (!cabin) {
//       return res.status(404).json({ message: "Cabin not found" });
//     }

//     // Find the seat
//     const seat = cabin.seats.find(
//       (s) => s.seat_number.toString() === seat_number
//     );

//     if (!seat) {
//       return res.status(404).json({ message: "Seat not found" });
//     }

//     if (seat.is_booked) {
//       return res.status(400).json({ message: "Seat is already booked" });
//     }

//     // Mark seat as booked
//     seat.is_booked = true;
//     await train.save();

//     // Create the booking
//     const booking = new Booking({
//       user_id,
//       train_id,
//       cabin_type,
//       seat_number,
//     });

//     await booking.save();

//     return res.status(200).json({ message: "Ticket booked successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// src/controllers/bookingController.js
import { Train } from "../models/Train.js";
import { Booking } from "../models/Booking.js";

export const bookTicket = async (req, res) => {
  const { user_id, train_id, cabin_type, seats } = req.body; // Change seat_number to seats
  console.log("user_id: ", user_id);
  console.log("train_id: ", train_id);
  console.log("cabin_type: ", cabin_type);
  console.log("seats: ", seats);

  try {
    // Find the train and check if the cabin is available
    const train = await Train.findById(train_id); // Populate seats if needed

    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    // Find the cabin
    const cabin = train.cabins.find(
      (c) => c.cabin_type.toString() === cabin_type
    );

    if (!cabin) {
      return res.status(404).json({ message: "Cabin not found" });
    }

    // Check if all requested seats are available
    // const unavailableSeats = seats.filter((seat_number) => {
    //   const seat = cabin.seats.find(
    //     (s) => s.seat_number.toString() === seat_number
    //   );
    //   return !seat || seat.is_booked; // Check if seat is booked or doesn't exist
    // });

    // if (unavailableSeats.length > 0) {
    //   return res
    //     .status(400)
    //     .json({
    //       message: `Seats ${unavailableSeats.join(
    //         ", "
    //       )} are already booked or invalid`,
    //     });
    // }

    // Mark seats as booked
    // for (const seat_number of seats) {
    //   const seat = cabin.seats.find(
    //     (s) => s.seat_number.toString() === seat_number
    //   );
    //   seat.is_booked = true;
    // }
    await train.save();

    // Calculate total fare (assuming a fare property exists in the cabin)
    const total_fare = cabin.fare * seats.length;

    // Create the booking
    const booking = new Booking({
      user_id,
      train_id,
      cabin_type,
      seats, // Use the array of seat numbers
      total_fare, // Include the total fare
    });

    await booking.save();

    return res
      .status(200)
      .json({ message: "Ticket booked successfully", booking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
