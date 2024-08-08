import { Router } from "express";
import { createNote, deleteNote, getNote } from "../controllers/note.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { ROLES } from "../models/user.model.js";

const route = Router();

route.post("/createNote", auth, createNote);
route.delete("/deleteNote/:id", auth, hasRole(ROLES.SUPER_ADMIN), deleteNote);
route.get("/getNote/:clientId", auth, getNote);

export default route;
