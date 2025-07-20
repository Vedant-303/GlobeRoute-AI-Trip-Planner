import UserSchema from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await UserSchema.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserSchema.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User created successfully", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserSchema.findOne({ email });
    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    res.json({ message: "Login successful", token, user: userData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
