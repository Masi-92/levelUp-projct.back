import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) return res.status(400).send({ message: "username or password is empty" });
  
    const user = await userModel.findOne({ username });
    if (!user) return res.status(400).send({ message: "username or password is incorrect" });
  
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.status(400).send({ message: "username or password is incorrect" });
  
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
  