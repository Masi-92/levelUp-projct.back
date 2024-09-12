import bcrypt from "bcrypt";
import terminModel from "../models/termin.model.js";
import {
  NOTIFICATION_ACTIONS,
  NOTIFICATION_TYPE,
} from "../models/notification.model.js";
import userModel, { ROLES } from "../models/user.model.js";
import clientModel from "../models/client.model.js";
import { createNotification } from "./notification.controller.js";
import dayjs from "dayjs";
import mongoose from "mongoose";

export const createTermin = async (req, res) => {
  const userId = req.user.id;

  const creator = await userModel.findById(userId);
  const { client, coach, subject, date, clientName } = req.body;

  const coachUser = await userModel.findById(coach);

  if (creator.role === ROLES.SECRETARY && coachUser.role !== ROLES.SECRETARY)
    return res
      .status(400)
      .send({ message: "Sie müssen einen Sekretär auswählen, keinen coach" });

  if (creator.role === ROLES.COACH && coachUser.role !== ROLES.COACH)
    return res
      .status(400)
      .send({ message: "Sie müssen einen Couch auswählen, keinen Sekretär" });

  if (dayjs().isAfter(date))
    return res
      .status(400)
      .send({
        message: "Sie können keine Termine in der Vergangenheit erstellen",
      });

  // check with sick days
  const termin = await terminModel.create({
    clientName,
    client,
    coach: coach,
    subject,
    date,
    creator: userId,
  });

  res.send(termin);

  const clientData = client && (await clientModel.findById(client));
  if (userId !== coach)
    createNotification({
      action: NOTIFICATION_ACTIONS.CREATE_TERMIN,
      creator: userId,
      user: coach,
      text:
        `a termin${
          clientData
            ? " with " + clientData.firstName + " " + clientData.lastName
            : ""
        } für Sie erstellt von ` + creator.fullName,
      type: NOTIFICATION_TYPE.INFO,
      subjectId: termin.id,
    });
};

export const updateTermin = async (req, res) => {
  const { id } = req.params;
  const {
    client,
    coach,
    subject,
    date,
    description,
    endTime,
    delay,
    meetingTime,
    status,
  } = req.body;

  if (date && dayjs().isAfter(date))
    return res
      .status(400)
      .send({
        message:
          "Sie können nicht einr Termine in der Vergangenheit bearbeiten",
      });

  let termin = await terminModel.findById(id);
  const updateBody = {};
  if (client) updateBody.client = client;
  if (coach) updateBody.coach = coach;
  if (subject) updateBody.subject = subject;
  if (date) updateBody.date = date;
  if (description) updateBody.description = description;
  if (endTime) updateBody.endTime = endTime;
  if (delay !== undefined) updateBody.delay = delay;
  if (meetingTime) {
    updateBody.meetingTime = meetingTime;

    const clientData = await clientModel.findById(termin.client);
    //   restTime: { $gt: 0 },
    //   to: { $gt: new Date(updateBody.endTime) },
    // });
    if (!clientData.massname)
      return res
        .status(400)
        .send({ message: "dieser Client hat keinen aktiven Massennamen" });

    clientData.massname.restTime -= meetingTime;
    await clientData.save();
  }
  if (status) updateBody.status = status;
  termin = await terminModel.findByIdAndUpdate(
    id,
    { $set: updateBody },
    { new: true }
  );
  if (!termin)
    return res.status(404).send({ message: "Termin nicht gefunden" });
  res.send(termin);
};

export const deleteTermin = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const termin = await terminModel.findOneAndDelete({
    _id: id,
    creator: userId,
  });
  if (!termin)
    return res.status(404).send({ message: "Termin nicht gefunden" });
  res.send(termin);
};

export const getTermin = async (req, res) => {
  const { id: userId, role: userRole } = req.user;
  const { client, coach, mine, from, to, role } = req.query;

  const filter = {};

  if (client)
    filter.client = mongoose.Types.ObjectId.createFromHexString(client);
  if (coach) filter.coach = mongoose.Types.ObjectId.createFromHexString(coach);
  if (mine === "true")
    filter.coach = mongoose.Types.ObjectId.createFromHexString(userId);
  if (from && to) filter.date = { $gte: new Date(from), $lt: new Date(to) };

  const pipeline = [
    {
      $match: filter,
    },
    {
      $lookup: {
        from: "users",
        localField: "coach",
        foreignField: "_id",
        as: "coach",
      },
    },
    {
      $unwind: {
        path: "$coach",
      },
    },
    (userRole === ROLES.COACH || userRole === ROLES.SECRETARY) && {
      $match: {
        "coach.role": userRole,
      },
    },
    role && {
      $match: {
        "coach.role": role,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "creator",
        foreignField: "_id",
        as: "creator",
      },
    },
    {
      $unwind: {
        path: "$creator",
      },
    },
    {
      $lookup: {
        from: "clients",
        let: { clientId: "$client" },
        pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$clientId"] } } }],
        as: "client",
      },
    },
    { $unwind: { path: "$client", preserveNullAndEmptyArrays: true } }, // Keep null if client doesn't exist
  ].filter((item) => item);

  const termins = await terminModel.aggregate(pipeline).sort({ date: 1 });
  res.send(termins);
};
export const getTerminById = async (req, res) => {
  const { id } = req.params;
  const termin = await terminModel.findById(id);
  res.send(termin);
};
