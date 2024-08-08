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
  subject: String,
  description: String,
},{timestamps:{createdAt:true,updatedAt:false}});

export default model("note", schema);
