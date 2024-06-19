import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { ROLES } from "../models/user.model.js";



const route = Router();
route.post("/createChef", auth, hasRole(ROLES.SUPER_ADMIN), createChef);
route.put("/updateChef/:id", auth, hasRole(ROLES.SUPER_ADMIN), updateChef);
route.delete("/deleteChef/:id", auth, hasRole(ROLES.SUPER_ADMIN), deleteChef);
route.get("/getChef", auth, hasRole(ROLES.SUPER_ADMIN), getChef);
route.get("/getChefById/:id", auth, hasRole(ROLES.SUPER_ADMIN), getChefById);


export default route;