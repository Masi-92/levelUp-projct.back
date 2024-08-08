import { model, Schema } from "mongoose";

const TerminStatus = {
  PENDING: "pending",
  COMPLETED: "completed",
  CANCELED: "canceled",
  UPDATE_TIME: "updateTime",
};

const schema = new Schema(
  {
    coach: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "client",
    },
    date: { type: Date, required: true },
    subject: { type: String, required: true },
    description: String,
    creator: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [TerminStatus.PENDING, TerminStatus.COMPLETED, TerminStatus.UPDATE_TIME, TerminStatus.CANCELED],
      default: TerminStatus.PENDING,
    },
    endTime: Date,
    delay: Number,
    meetingTime: Number,
  },
  { timestamps: true }
);

export default model("termin", schema);



