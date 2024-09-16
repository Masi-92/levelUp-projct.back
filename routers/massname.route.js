import { Router } from "express";
import { createMassname, deleteMassname, getMassname, updateMassname } from "../controllers/massname.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { ROLES } from "../models/user.model.js";

const route = Router();

route.post("/createMassname", auth, hasRole(ROLES.SUPER_ADMIN, ROLES.CHEF, ROLES.COACH), createMassname);
route.put("/updateMassname/:id", auth, hasRole(ROLES.SUPER_ADMIN, ROLES.CHEF, ROLES.COACH), updateMassname);
route.delete("/deleteMassname/:id", auth, hasRole(ROLES.SUPER_ADMIN, ROLES.CHEF, ROLES.COACH), deleteMassname);
route.get("/getMassname/:client", auth, hasRole(ROLES.SUPER_ADMIN, ROLES.CHEF, ROLES.COACH), getMassname);

export default route;
