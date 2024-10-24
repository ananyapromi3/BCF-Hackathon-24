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
