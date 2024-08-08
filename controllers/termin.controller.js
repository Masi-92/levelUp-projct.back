import bcrypt from "bcrypt";
import terminModel from "../models/termin.model.js";
import { NOTIFICATION_ACTIONS, NOTIFICATION_TYPE } from "../models/notification.model.js";
import userModel from "../models/user.model.js";
import clientModel from "../models/client.model.js";
import { createNotification } from "./notification.controller.js";
export const createTermin = async (req, res) => {
  const userId = req.user.id;

  const { client, coach, subject, date } = req.body;

  // check with sick days
  const termin = await terminModel.create({
    client,
    coach,
    subject,
    date,
    creator: userId,
  });

  res.send(termin);

  const creator = await userModel.findById(userId);
  const clientData =client && await clientModel.findById(client);
  if (userId !== coach)
    createNotification({
      action: NOTIFICATION_ACTIONS.CREATE_TERMIN,
      creator: userId,
      user: coach,
      text: `a termin${clientData ? " with "+clientData.firstName+" "+clientData.lastName : ""} created for you by ` + creator.fullName,
      type: NOTIFICATION_TYPE.INFO,
      subjectId: termin.id,
    });
};

export const updateTermin = async (req, res) => {
  const { id } = req.params;
  const { client, coach, subject, date, description,endTime,delay,meetingTime,status } = req.body;

  const updateBody = {};
  if (client) updateBody.client = client;
  if (coach) updateBody.coach = coach;
  if (subject) updateBody.subject = subject;
  if (date) updateBody.date = date;
  if (description) updateBody.description = description;
  if (endTime) updateBody.endTime = endTime;
  if (delay!==undefined) updateBody.delay = delay;
  if (meetingTime) updateBody.meetingTime = meetingTime;
  if (status) updateBody.status = status;
  const termin = await terminModel.findByIdAndUpdate(id, { $set: updateBody }, { new: true });
  if (!termin) return res.status(404).send({ message: "termin not found" });
  res.send(termin);
};

export const deleteTermin = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const termin = await terminModel.findOneAndDelete({ _id: id, creator: userId });
  if (!termin) return res.status(404).send({ message: "termin not found" });
  res.send(termin);
};

export const getTermin = async (req, res) => {
  const userId = req.user.id;
  const { client, coach, mine } = req.query;

  const filter = {};

  if (client) filter.client = client;
  if (coach) filter.coach = coach;
  if (mine === "true") filter.coach = userId;

  const termins = await terminModel
    .find(filter)
    .populate("client", "firstName lastName")
    .populate("coach", "fullName image")
    .populate("creator", "fullName");
  res.send(termins);
};
export const getTerminById = async (req, res) => {
  const { id } = req.params;
  const termin = await terminModel.findById(id);
  res.send(termin);
};
