import notificationModel from "../models/notification.model.js";


export const createNotification = async ({ text, type, subjectId, action, user, creator }) => {
    const notification = await notificationModel.create({
      text,
      type,
      action,
      user,
      creator,
      subjectId,
    });
  
    return notification;
  };
  