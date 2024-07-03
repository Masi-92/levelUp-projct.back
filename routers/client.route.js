import { Router } from "express";
import { createClient, deleteClient, getClient, getClientById, updateClient } from "../controllers/client.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { ROLES } from "../models/user.model.js";

const route = Router();

route.post("/createClient", auth, hasRole(ROLES.SECRETARY,ROLES.COACH), createClient);
route.put("/updateClient/:id", auth, hasRole(ROLES.SECRETARY,ROLES.COACH), updateClient);
route.delete("/deleteClient/:id", auth, hasRole(ROLES.SECRETARY,ROLES.COACH), deleteClient);
route.get("/getClient", auth, hasRole(ROLES.SECRETARY,ROLES.COACH), getClient);
route.get("/getClientById/:id", auth, hasRole(ROLES.SECRETARY,ROLES.COACH), getClientById);

export default route;