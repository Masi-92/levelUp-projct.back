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

export const updateCoach = async (req, res) => {
  const { id } = req.params;
  const { username, password, fullName, email, phoneNumber, role } = req.body;

  const updateBody = {};
  if (username) updateBody.username = username;
  if (fullName) updateBody.fullName = fullName;
  if (email) updateBody.email = email;
  if (phoneNumber) updateBody.phoneNumber = phoneNumber;
  if (role) updateBody.role = role;
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateBody.password = hashedPassword;
  }
  const coach = await userModel.findByIdAndUpdate(id, { $set: updateBody }, { new: true });
  if (!coach) return res.status(404).send({ message: "coach nicht gefunden" });
  res.send(coach);
};

export const deleteCoach = async (req, res) => {
  const { id } = req.params;
  const coach = await userModel.findByIdAndDelete(id);
  if (!coach) return res.status(404).send({ message: "coach nicht gefunden" });
  res.send(coach);
};

export const getCoach = async (req, res) => {
  const search = req.query.search || "";
  const role = req.query.role || "";
  const searchRegex = new RegExp(search, "i");
  const roleFilterQuery = [];
  if (role === ROLES.COACH) roleFilterQuery.push({ role: ROLES.COACH });
  else if (role === ROLES.SECRETARY) roleFilterQuery.push({ role: ROLES.SECRETARY });
  else roleFilterQuery.push({ role: ROLES.SECRETARY }, { role: ROLES.COACH });
  const coaches = await userModel.find({
    $and: [
      { $or: roleFilterQuery },
      {
        $or: [
          { username: { $regex: searchRegex } },
          { fullName: { $regex: searchRegex } },
          { email: { $regex: searchRegex } },
        ],
      },
    ],
  });
  res.send(coaches);
};
export const getCoachById = async (req, res) => {
  const { id } = req.params;
  const coach = await userModel.findById(id);
  res.send(coach);
};
