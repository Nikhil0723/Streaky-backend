import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const JWT_SECRET = "your-super-secret-key";

export const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      return res.status(404).json({ message: "user dont exit" });
    }

    const correctPassword = await bcrypt.compare(password, userExist.password);

    if (!correctPassword) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({ message: "Login succesfull" });
  } catch (error) {
    console.error(error, "Login error");
    return res.status(500).json({ message: "Internal Error" });
  }
};

export const register = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "User already Exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "Registration successful", user: newUser });
  } catch (error) {
    console.error(error, "Login error");
    return res.status(500).json({ message: "Internal Error" });
  }
};
