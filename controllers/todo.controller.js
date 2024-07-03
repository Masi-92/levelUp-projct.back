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