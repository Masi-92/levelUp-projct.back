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
  if (!notification) return res.status(404).send({ message: "Benachrichtigung nicht gefunden" });
  res.send(notification);
};

export const getNotification = async (req, res) => {
  const userId = req.user.id;

  const notifications = await notificationModel
    .find({
      user: userId,
    })
    .sort({_id:-1})
    .limit(10)
    .populate("creator", "image fullName username");
  res.send(notifications);
};
