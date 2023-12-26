import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { email, password, username, rol } = req.body;

  try {
    const userFoundByEmail = await User.findOne({ email });
    const userFoundByUsername = await User.findOne({ username });

    if (userFoundByEmail) {
      return res.status(400).json(["The email is already in use"]);
    }

    if (userFoundByUsername) {
      return res.status(400).json(["The username is already in use"]);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      rol,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      rol: userSaved.rol,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
