import { Router } from "express";
import { createTodo, deleteTodo, getTodo, getTodoById, updateTodo } from "../controllers/todo.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { ROLES } from "../models/user.model.js";

const route = Router();

route.post("/createTodo", auth, hasRole(ROLES.COACH,ROLES.SECRETARY), createTodo);
route.put("/updateTodo/:id", auth, hasRole(ROLES.COACH,ROLES.SECRETARY), updateTodo);
route.delete("/deleteTodo/:id", auth, hasRole(ROLES.COACH,ROLES.SECRETARY), deleteTodo);
route.get("/getTodo", auth, hasRole(ROLES.COACH,ROLES.SECRETARY), getTodo);
route.get("/getTodoById/:id", auth, hasRole(ROLES.COACH,ROLES.SECRETARY) , getTodoById);

export default route;