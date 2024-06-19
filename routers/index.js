import { Router } from "express";
import userRoute from "./user.route.js";
import chefRoute from "./chef.route.js";


router.use("/chef", chefRoute);



const router = Router();
