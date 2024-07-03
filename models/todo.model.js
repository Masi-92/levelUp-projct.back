import mongoose, { model, Schema } from "mongoose";

const schema = new Schema(
  {
    text: String,
    done: {type : Boolean,default: false},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export default model("todo", schema);
