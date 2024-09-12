import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).send({ message: "Benutzername oder Passwort sind leer" });

  const user = await userModel.findOne({ username });
  if (!user) return res.status(400).send({ message: "Benutzername oder Passwort sind falsch" });

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) return res.status(400).send({ message: "Benutzername oder Passwort sind falsch" });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.SECRET,
    { expiresIn: "3d" }
  );

  res.send({ token, fullName: user.fullName, image: user.image });
};

export const updateProfile = async (req, res) => {
  const userId = req.user.id;

  const result = await userModel.findByIdAndUpdate(userId, {
    $set: req.body,
  },{new:true});

  res.send(result)
};


