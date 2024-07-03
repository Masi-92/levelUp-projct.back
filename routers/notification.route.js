import { Router } from "express";
import {
    getNotification,
    seenNotification
} from "../controllers/notification.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { ROLES } from "../models/user.model.js";

const route = Router();

route.put("/seenNotification/:id", auth, hasRole(ROLES.COACH,ROLES.SECRETARY), seenNotification);
route.get("/getNotification", auth, hasRole(ROLES.COACH,ROLES.SECRETARY), getNotification);

export default route;
