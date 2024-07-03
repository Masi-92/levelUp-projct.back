import { model, Schema } from "mongoose";

const schema = new Schema({
  coach: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "client",
  },
  date: Date,
  subject: String,
});

export default model("termin", schema);
