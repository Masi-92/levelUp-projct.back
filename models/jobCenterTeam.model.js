import { model, Schema } from "mongoose";

const schema = new Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },
  personnel: [
    {
      type: String,
    },
  ],
  email: [String],
  phone: [String],
  tel: [String],
});

export default model("jobCenterTeam", schema);
