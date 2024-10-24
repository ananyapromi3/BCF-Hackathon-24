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
