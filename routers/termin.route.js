import { Router } from "express";
import {
  createTermin,
  deleteTermin,
  getTermin,
  getTerminById,
  updateTermin,
} from "../controllers/termin.controller.js";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.middleware.js";
import { createTerminSchema } from "../validation/termin.schema.js";
import { paginate } from "../middleware/paginate.middleware.js";

const route = Router();

route.post("/createTermin", auth, validate(createTerminSchema), createTermin);
route.put("/updateTermin/:id", auth, updateTermin);
route.delete("/deleteTermin/:id", auth, deleteTermin);
route.get("/getTermin", auth,paginate, getTermin);
route.get("/getTerminById/:id", auth, getTerminById);

export default route;
