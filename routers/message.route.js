import { Router } from "express";
import {
    createMessage,
    getMessage
} from "../controllers/message.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { validate } from "../middleware/validate.middleware.js";
import { ROLES } from "../models/user.model.js";
import { createMessageSchema } from "../validation/message.schema.js";

const route = Router();

route.post(
  "/createMessage",
  validate(createMessageSchema),
  auth,
  hasRole(ROLES.SUPER_ADMIN, ROLES.CHEF),
  createMessage
);
route.get("/getMessage", auth, hasRole(ROLES.SUPER_ADMIN, ROLES.CHEF,ROLES.COACH,ROLES.SECRETARY), getMessage);

export default route;
