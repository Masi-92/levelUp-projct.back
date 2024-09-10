import clientModel from "../models/client.model.js";
import { NOTIFICATION_ACTIONS, NOTIFICATION_TYPE } from "../models/notification.model.js";
import { TrackType } from "../models/track.model.js";
import userModel, { ROLES } from "../models/user.model.js";
import { createNotification } from "./notification.controller.js";
import { trackClientEvents } from "./track.controller.js";

export const createClient = async (req, res) => {
  const userId = req.user.id;

  let clientNumber;
  const lastClients = await clientModel.find().sort({ createdAt: -1 }).limit(1);

  if (lastClients.length > 0) {
    const clientNum = lastClients[0].clientNumber;
    let number = clientNum.slice(2);
    number = parseInt(number);
    clientNumber = "LU" + (number + 1);
  } else {
    clientNumber = "LU10000";
  }

  const client = await clientModel.create({
    ...req.body,
    owner: userId,
    creator: userId,
    clientNumber,
  });

  res.send(client);

  trackClientEvents(userId, client._id, TrackType.CREATE_CLIENT, req.body);
};
function findDifferentFields(obj1, obj2) {
  const differences = {};

  // Check for fields in obj2 that are not in obj1 or have different values
  for (const key in obj2) {
    if (
      !(key in obj1) ||
      (!obj1[key].toISOString && obj1[key].toString() !== obj2[key].toString()) ||
      (obj1[key].toISOString && obj1[key].toISOString?.() !== obj2[key].toString())
    ) {
      differences[key] = { to: obj2[key], from: obj1[key] };
    }
  }

  // Check for fields in obj1 that are not in obj2
  for (const key in obj1) {
    if (!(key in obj2)) {
      differences[key] = undefined;
    }
  }

  return differences;
}

export const updateClient = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const client = await clientModel.findByIdAndUpdate(id, { $set: req.body }).lean();
  if (!client) return res.status(404).send({ message: "client not found" });
  res.send(client);

  trackClientEvents(userId, client._id, TrackType.EDIT_CLIENT, findDifferentFields(client, req.body));
};

export const updateClientOwner = async (req, res) => {
  const { id: clientId } = req.params;
  const userId = req.user.id;
  const newCoachId = req.body.owner;

  let client = await clientModel.findById(clientId);
  if (!client) return res.status(404).send({ message: "client not found" });

  const previousCoach = await userModel.findById(client.owner);
  client.owner = newCoachId;
  client = await client.save();
  const newCoach = await userModel.findById(newCoachId);

  res.send(client);

  trackClientEvents(userId, client._id, TrackType.ASSIGN_CLIENT, {
    coach: { from: previousCoach?.fullName, to: newCoach?.fullName },
    owner: { from: previousCoach?.id, to: newCoach?.id },
  });

  const assigner = await userModel.findById(userId);

  if (newCoachId !== userId)
    createNotification({
      action: NOTIFICATION_ACTIONS.ASSIGN_CLIENT,
      creator: userId,
      user: newCoachId,
      text: `client '${client.firstName + " " + client.lastName}' assigned to you by ${assigner.fullName}`,
      type: NOTIFICATION_TYPE.INFO,
      subjectId: client.id,
    });

  if (previousCoach.id !== userId)
    createNotification({
      action: NOTIFICATION_ACTIONS.REMOVE_ASSIGNMENT,
      creator: userId,
      user: previousCoach.id,
      text: `client '${client.firstName + " " + client.lastName}' assigned from you to ${newCoach.fullName} by ${
        assigner.fullName
      }`,
      type: NOTIFICATION_TYPE.INFO,
      subjectId: client.id,
    });
};

export const deleteClient = async (req, res) => {
  const { id } = req.params;
  const client = await clientModel.findByIdAndUpdate(id, { $set: { isDeleted: true } });
  if (!client) return res.status(404).send({ message: "client not found" });
  res.send(client);
};

export const getClient = async (req, res) => {
  const { id: userId, role } = req.user;

  const search = req.query.search || "";
  const isMine = req.query.isMine === "true";
  const isCoach = role === ROLES.COACH;
  const hasMassname = req.query.hasMassname === "true";
  const searchRegex = new RegExp(search, "i");
  const findQuery = {
    isDeleted: false,
  };
  if (isMine) findQuery.owner = userId;
  if (!isCoach) findQuery.massname = { $eq: undefined };
  if (hasMassname) findQuery.massname = { $ne: undefined };

  const clients = await clientModel
    .find({
      $and: [
        findQuery,
        {
          $or: [
            { firstName: { $regex: searchRegex } },
            { lastName: { $regex: searchRegex } },
            { clientNumber: { $regex: searchRegex } },
          ],
        },
      ],
    })
    .sort({ createdAt: -1 })
    .populate("owner", "fullName");
  res.send(clients);
};
export const getClientById = async (req, res) => {
  const { id } = req.params;
  const client = await clientModel.findOne({ _id: id, isDeleted: false });
  res.send(client);
};
