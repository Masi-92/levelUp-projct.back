import { model, Schema } from "mongoose";

export const ROLES = {
  SUPER_ADMIN: "superAdmin",
  CHEF: "chef",
  COACH: "coach",
  SECRETARY: "secretary",
  CLIENT: "client",
};

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [ROLES.CHEF, ROLES.SUPER_ADMIN, ROLES.COACH, ROLES.SECRETARY, ROLES.CLIENT],
  },
  image: String,
  email: String,
  phoneNumber: String,
});

export default model("user", schema);
