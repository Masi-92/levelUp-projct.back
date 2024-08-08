import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";

export const TrackType = {
  CREATE_CLIENT: "createClient",
  EDIT_CLIENT: "editClient",
  ASSIGN_CLIENT: "assignClient",
};

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    type: {
      type: String,
      required: true,
      enum: [TrackType.CREATE_CLIENT, TrackType.EDIT_CLIENT, TrackType.ASSIGN_CLIENT],
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "client",
    },
    payload: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

export default model("track", schema);
