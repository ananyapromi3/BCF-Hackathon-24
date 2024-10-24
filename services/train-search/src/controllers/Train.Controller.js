// src/controllers/Train.Controller.js
import { Train } from "../models/Train.js";

// Controller for searching trains
// export async function searchTrains(req, res) {
export const searchTrains = async (req, res) => {
  try {
    const { from, to, date } = req.body;

    if (!from || !to || !date) {
      return res
        .status(400)
        .json({ message: "Please provide from, to, and date." });
    }

    const formattedDate = new Date(date);

    // Query the trains based on the route and date
    const trains = await Train.find({
      "route.from": from,
      "route.to": to,
      date: date,
    });

    if (!trains.length) {
      return res
        .status(404)
        .json({ message: "No trains found for the specified route and date." });
    }

    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get trains status by train ID
export const getTrains = async (req, res) => {
  const { trainId } = req.params;
  console.log("trainId:", trainId);

  try {
    // Retrieve train record from the database
    const train = await Train.findOne({ _id: trainId });

    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    // Respond with the payment details
    res.status(200).json({
      trainId: train._id,
      train_name: train.train_name,
      route: train.route,
      date: train.date,
      departure_time: train.departure_time,
      arrival_time: train.arrival_time,
      cabins: train.cabins,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment status", error });
  }
};

// src/controllers/Train.Controller.js
// import { Train } from "../models/Train.js";

// Controller to book a seat
export const bookSeat = async (req, res) => {
  try {
    const { trainId, cabinType, seatNumber } = req.body;
    console.log("trainId:", trainId);
    console.log("cabinType:", cabinType);
    console.log("seatNumber:", seatNumber);

    if (!trainId || !cabinType || !seatNumber) {
      return res
        .status(400)
        .json({
          message: "Please provide train ID, cabin type, and seat number.",
        });
    }

    // Find the train and cabin, and update the seat's isTrue field
    const train = await Train.findOneAndUpdate(
      {
        _id: trainId,
        "cabins.cabin_type": cabinType,
        "cabins.seats.seat_number": seatNumber,
      },
      { $set: { "cabins.$[cabin].seats.$[seat].is_booked": true } },
      {
        arrayFilters: [
          { "cabin.cabin_type": cabinType },
          { "seat.seat_number": seatNumber },
        ],
        new: true,
      }
    );

    if (!train) {
      return res
        .status(404)
        .json({ message: "Train, cabin, or seat not found" });
    }

    res.status(200).json({ message: "Seat reserved successfully", train });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to cancel a seat booking
export const cancelSeat = async (req, res) => {
  try {
    const { trainId, cabinType, seatNumber } = req.body;

    if (!trainId || !cabinType || !seatNumber) {
      return res
        .status(400)
        .json({
          message: "Please provide train ID, cabin type, and seat number.",
        });
    }

    // Find the train and cabin, and update the seat's isTrue field
    const train = await Train.findOneAndUpdate(
      {
        _id: trainId,
        "cabins.cabin_type": cabinType,
        "cabins.seats.seat_number": seatNumber,
      },
      { $set: { "cabins.$[cabin].seats.$[seat].is_booked": false } },
      {
        arrayFilters: [
          { "cabin.cabin_type": cabinType },
          { "seat.seat_number": seatNumber },
        ],
        new: true,
      }
    );

    if (!train) {
      return res
        .status(404)
        .json({ message: "Train, cabin, or seat not found" });
    }

    res.status(200).json({ message: "Seat no longer reserved", train });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
