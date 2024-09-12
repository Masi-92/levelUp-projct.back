import { Router } from "express";
import { createTodo, deleteTodo, getCoachTodoByChef, getTodo, getTodoById, updateTodo } from "../controllers/todo.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { ROLES } from "../models/user.model.js";

const route = Router();

route.post("/createTodo", auth, createTodo);
route.put("/updateTodo/:id", auth, updateTodo);
route.delete("/deleteTodo/:id", auth, deleteTodo);
route.get("/getTodo", auth, getTodo);
route.get("/getCoachTodoByChef", auth,hasRole(ROLES.CHEF), getCoachTodoByChef);
route.get("/getTodoById/:id", auth, getTodoById);

export default route;
