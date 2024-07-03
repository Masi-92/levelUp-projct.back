import messageModel from "../models/message.model.js";

export const createMessage = async (req, res) => {
  const { text } = req.body;
  const message = await messageModel.create({
    text,
  });

  res.send(message);
};

export const getMessage = async (req, res) => {
  const messages = await messageModel.find().sort({ createdAt: -1 }).limit(1);
  if (messages.length === 0) return res.send({text : ""});
  res.send(messages[0]);
};
