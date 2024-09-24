import { Router } from "express";
import {
    createClient,
    deleteClient,
    getClient,
    getClientById,
    updateClient,
    updateClientOwner,
} from "../controllers/client.controller.js";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.middleware.js";
import { createClientSchema } from "../validation/client.schema.js";
import { paginate } from "../middleware/paginate.middleware.js";

const route = Router();

route.post("/createClient", auth, validate(createClientSchema), createClient);
route.put("/updateClient/:id", auth, updateClient);
route.put("/updateClientOwner/:id", auth, updateClientOwner);
route.delete("/deleteClient/:id", auth, deleteClient);
route.get("/getClient", auth,paginate, getClient);
route.get("/getClientById/:id", auth, getClientById);

export default route;

