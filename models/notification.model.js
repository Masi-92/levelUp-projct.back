import { model, Schema } from "mongoose";

export const NOTIFICATION_ACTIONS = {
  NEW_TODO: "newTodo",
  ASSIGN_CLIENT: "assignClient",
};

export const NOTIFICATION_TYPE = {
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
  INFO: "info",
};

const schema = new Schema(
  {
    text: String,
    action: {
      type: String,
      enum: [NOTIFICATION_ACTIONS.NEW_TODO, NOTIFICATION_ACTIONS.ASSIGN_CLIENT],
    },
    subjectId: Schema.Types.ObjectId,
    type: {
      type: String,
      enum: [NOTIFICATION_TYPE.DANGER, NOTIFICATION_TYPE.SUCCESS, NOTIFICATION_TYPE.WARNING,NOTIFICATION_TYPE.INFO],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    creator : {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    seen : {type:Boolean,default :false}
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model("notification", schema);
