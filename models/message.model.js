import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    text: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model("message", schema);
