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
  

  export const seenNotification = async (req, res) => {
    const { id } = req.params;
  
    const updateBody = {
      seen: true,
    };

    const notification = await notificationModel.findByIdAndUpdate(id, { $set: updateBody }, { new: true });
    if (!notification) return res.status(404).send({ message: "notification not found" });
    res.send(notification);
  };