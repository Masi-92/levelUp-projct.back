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

export const updateChef = async (req, res) => {
  const { id } = req.params;
  const { username, password, fullName, email, phoneNumber } = req.body;

  const updateBody = {};
  if (username) updateBody.username = username;
  if (fullName) updateBody.fullName = fullName;
  if (email) updateBody.email = email;
  if (phoneNumber) updateBody.phoneNumber = phoneNumber;
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateBody.password = hashedPassword;
  }
  const chef = await userModel.findByIdAndUpdate(id, { $set: updateBody }, { new: true });
  if (!chef) return res.status(404).send({ message: "chef not found" });
  res.send(chef);
};

export const deleteChef = async (req, res) => {
  const { id } = req.params;
  const chef = await userModel.findByIdAndDelete(id);
  if (!chef) return res.status(404).send({ message: "chef not found" });
  res.send(chef);
};

export const getChef = async (req, res) => {
  const search = req.query.search || "";
  const searchRegex = new RegExp(search, "i");
  const chefs = await userModel.find({
    role: ROLES.CHEF,
    $or: [
      { username: { $regex: searchRegex } },
      { fullName: { $regex: searchRegex } },
      { email: { $regex: searchRegex } },
    ],
  });
  res.send(chefs);
};
export const getChefById = async (req, res) => {
  const { id } = req.params;
  const chef = await userModel.findById(id);
  res.send(chef);
};
