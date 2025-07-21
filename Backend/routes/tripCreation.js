import express from "express";
import { generateTrip } from "../utils/gemini.js";
import { Trip } from "../models/trip.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", authenticateUser, async (req, res) => {
  const { fromDate, toDate, origin, destination, budget, group, people } =
    req.body;

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
      userId: req.user._id,
    });

    res.json({ success: true, trip: savedTrip });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/user-trips/:userId", authenticateUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const trips = await Trip.find({ userId }).sort({ createdAt: -1 });

    res.json({ success: true, trips });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip)
      return res
        .status(404)
        .json({ success: false, message: "Trip not found" });
    res.status(200).json({ success: true, trip });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
