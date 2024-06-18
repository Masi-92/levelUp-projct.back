import { model, Schema } from "mongoose";

const GENDER = {
  FEMALE: "female",
  MALE: "male",
  OTHER: "other",
};
const CAR_LICENSE = {
  MOTOR: "motor",
};

const docSchema = new Schema({
  name: String,
  file: String,
});

const schema = new Schema({
  firstName: String,
  lastName: String,
  clientNumber: String,
  address: String,
  age: Number,
  tel: String,
  status: String,
  lang: String,
  jobPermission: Boolean,
  birthDay: Date,
  BirthPlace: String,
  carLicense: { type: String, enum: [CAR_LICENSE.MOTOR] },
  description: String,
  education: String,
  marital: Boolean,
  gender: { type: String, enum: [GENDER.FEMALE, GENDER.MALE, GENDER.OTHER] },
  docs: [docSchema],
});

export default model("client", schema);
