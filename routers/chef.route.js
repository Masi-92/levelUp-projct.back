import { Router } from "express";





const route = Router();
route.post("/createChef", auth, hasRole(ROLES.SUPER_ADMIN), createChef);
