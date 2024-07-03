import userModel, { ROLES } from "../models/user.model.js";
import bcrypt from "bcrypt";



export const createCoach = async (req, res) => {
    const { username, password, fullName, image, phoneNumber, email, role } = req.body;
    const user = await userModel.findOne({ username });
    if (user) return res.status(400).send({ message: "coach with username already exist!" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const coach = await userModel.create({
      username,
      fullName,
      password: hashedPassword,
      role,
      image,
      phoneNumber,
      email,
    });
  
    res.send(coach);
  };