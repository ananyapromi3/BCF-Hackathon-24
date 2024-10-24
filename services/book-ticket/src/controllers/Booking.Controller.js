// src/controllers/bookingController.js
import { Train } from "../models/Train.js";
import { Booking } from "../models/Booking.js";

export const bookTicket = async (req, res) => {
  const { user_id, train_id, cabin_type, seat_number } = req.body;

  try {
    // Find the train and check if the seat is available
    const train = await Train.findById(train_id);

    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    // Find the cabin
    const cabin = train.cabins.find((c) => c.cabin_type.toString() === cabin_type);

    if (!cabin) {
      return res.status(404).json({ message: "Cabin not found" });
    }

    // Find the seat
    const seat = cabin.seats.find((s) => s.seat_number.toString() === seat_number);

    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    if (seat.is_booked) {
      return res.status(400).json({ message: "Seat is already booked" });
    }

    // Mark seat as booked
    seat.is_booked = true;
    await train.save();

    // Create the booking
    const booking = new Booking({
      user_id,
      train_id,
      cabin_type,
      seat_number,
    });

    await booking.save();

    return res.status(200).json({ message: "Ticket booked successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
