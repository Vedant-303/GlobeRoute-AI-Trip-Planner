import express from "express";
import { generateTrip } from "../utils/gemini.js";
import { Trip } from "../models/trip.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const {
    fromDate,
    toDate,
    origin,
    destination,
    budget,
    group,
    people,
  } = req.body;

  try {
    const trip = await generateTrip({
      fromDate,
      toDate,
      origin,
      destination,
      budget,
      group,
      people,
    });

    const savedTrip = await Trip.create({
      ...trip,
      userId: req.user?._id,
    });
    res.json({ success: true, trip: savedTrip });
    console.log("User ID in request:", req.user?._id);
    console.log("Trip being saved:", trip);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
