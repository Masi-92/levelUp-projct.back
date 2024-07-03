import { Router } from "express";
import userRoute from "./user.route.js";
import chefRoute from "./chef.route.js"

const router = Router();

router.use("/user", userRoute);

router.use("/chef", chefRoute);




export default router;