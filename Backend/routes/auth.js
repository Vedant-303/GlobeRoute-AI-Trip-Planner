import { signup, login } from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/auth");
  });
});

export default router;
