import { NOTIFICATION_ACTIONS, NOTIFICATION_TYPE } from "../models/notification.model.js";
import todoModel from "../models/todo.model.js";
import { createNotification } from "./notification.controller.js";


export const createTodo = async (req, res) => {
    const userId = req.user.id;
    const { text } = req.body;
  
    const todo = await todoModel.create({
      text,
      user: userId,
    });
    createNotification({
        action: NOTIFICATION_ACTIONS.NEW_TODO,
        creator: userId,
        user: userId,
        text: "a new todo assign to you",
        type: NOTIFICATION_TYPE.INFO,
        subjectId: todo._id,
      });
    
      res.send(todo);
    };

    export const updateTodo = async (req, res) => {
        const { id } = req.params;
        const { text, done } = req.body;
      
        const updateBody = {};
        if (text) updateBody.text = text;
        if (done !== undefined) updateBody.done = done;
        const todo = await todoModel.findByIdAndUpdate(id, { $set: updateBody }, { new: true });
        if (!todo) return res.status(404).send({ message: "todo not found" });
        res.send(todo);
      };