import trackModel from "../models/track.model.js";

export const trackClientEvents = async (user, client, type, payload) => {
  return await trackModel.create({
    user,
    client,
    type,
    payload,
  });
};

export const getTracks = async (req, res) => {
  const tracks = await trackModel.find()
  .populate("user", "image username fullName role")
  .populate("client", "clientNumber firstName lastName")
  .sort({createdAt : -1})
  res.send(tracks);
};
