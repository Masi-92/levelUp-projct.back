import { NOTIFICATION_ACTIONS, NOTIFICATION_TYPE } from "../models/notification.model.js";
import todoModel from "../models/todo.model.js";
import { ROLES } from "../models/user.model.js";
import { createNotification } from "./notification.controller.js";

export const createTodo = async (req, res) => {
  const { id: userId, role } = req.user;
  const { text, coach, date } = req.body;

  if ((role === ROLES.COACH || role === ROLES.SECRETARY) && coach)
    return res.status(400).send({ message: "you can not create todo to other coaches" });

  const todo = await todoModel.create({
    text,
    user: coach || userId,
    creator: userId,
    date,
  });

  createNotification({
    action: NOTIFICATION_ACTIONS.NEW_TODO,
    creator: userId,
    user: coach || userId,
    text: "dir wird ein neues Todo zugewiesen",
    type: NOTIFICATION_TYPE.INFO,
    subjectId: todo._id,
  });

  res.send(todo);
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, done, date } = req.body;

  const updateBody = {};
  if (text) updateBody.text = text;
  if (date) updateBody.date = date;
  if (done !== undefined) updateBody.done = done;
  const todo = await todoModel.findByIdAndUpdate(id, { $set: updateBody }, { new: true });
  if (!todo) return res.status(404).send({ message: "todo nicht gefunden" });
  res.send(todo);
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await todoModel.findByIdAndDelete(id);
  if (!todo) return res.status(404).send({ message: "todo nicht gefunden" });
  res.send(todo);
};

export const getTodo = async (req, res) => {
  const userId = req.user.id;

  const byChef = req.query.by === "chef";
  const byOwn = req.query.by === "own";
  const { search = "", from, to } = req.query;
  const searchRegex = new RegExp(search, "i");
  const findQuery = {
    user: userId,
    text: { $regex: searchRegex },
  };
  if (byOwn) findQuery.creator = userId;
  else if (byChef) findQuery.creator = { $ne: userId };
  if (from && to) findQuery.date = { $gte: new Date(from), $lt: new Date(to) };

  const todos = await todoModel.find(findQuery).sort({ date: -1, createdAt: -1 });
  res.send(todos);
};

export const getCoachTodoByChef = async (req, res) => {
  const userId = req.user.id;
  const search = req.query.search || "";
  const searchRegex = new RegExp(search, "i");
  const todos = await todoModel
    .find({
      creator: userId,
      user: {
        $ne: userId,
      },
      text: { $regex: searchRegex },
    })
    .populate("user", "fullName username")
    .sort({ createdAt: -1 });
  res.send(todos);
};
export const getTodoById = async (req, res) => {
  const { id } = req.params;
  const todo = await todoModel.findById(id);
  res.send(todo);
};
