import mongoose, { model, Schema } from "mongoose";

const schema = new Schema(
  {
    text: String,
    done: { type: Boolean, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    date:Date
  },
  { timestamps: true }
);

export default model("todo", schema);
