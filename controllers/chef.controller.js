import userModel, { ROLES } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const createChef = async (req, res) => {
    const { username, password, fullName, image, phoneNumber, email } = req.body;
  
    const user = await userModel.findOne({ username });
    if (user) return res.status(400).send({ message: "chef with username already exist!" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const chef = await userModel.create({
      username,
      fullName,
      password: hashedPassword,
      role: ROLES.CHEF,
      image,
      phoneNumber,
      email,
    });
  
    res.send(chef);
  };