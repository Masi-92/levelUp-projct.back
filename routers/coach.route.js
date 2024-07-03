import { Router } from "express";
import { createCoach, deleteCoach, getCoach, getCoachById, updateCoach } from "../controllers/coach.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createCoachSchema } from "../validation/coach.schema.js";
import { ROLES } from "../models/user.model.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";

const route = Router();

route.post("/createCoach", validate(createCoachSchema), auth, hasRole(ROLES.SUPER_ADMIN, ROLES.CHEF), createCoach);
route.put("/updateCoach/:id", validate(createCoachSchema), auth, hasRole(ROLES.SUPER_ADMIN, ROLES.CHEF), updateCoach);
route.delete("/deleteCoach/:id", auth, hasRole(ROLES.SUPER_ADMIN, ROLES.CHEF), deleteCoach);
route.get("/getCoach", auth, hasRole(ROLES.SUPER_ADMIN, ROLES.CHEF), getCoach);
route.get("/getCoachById/:id", auth, hasRole(ROLES.SUPER_ADMIN, ROLES.CHEF), getCoachById);

export default route;
