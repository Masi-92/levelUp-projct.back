import { Router } from "express";
import { getNotification, seenNotification } from "../controllers/notification.controller.js";
import { auth } from "../middleware/auth.js";

const route = Router();

route.put("/seenNotification/:id", auth, seenNotification);
route.get("/getNotification", auth, getNotification);

export default route;
