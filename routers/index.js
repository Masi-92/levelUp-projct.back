import { Router } from "express";
import userRoute from "./user.route.js";
import chefRoute from "./chef.route.js";
import coachRoute from "./coach.route.js";
import clientRoute from "./client.route.js";
import messageRoute from "./message.route.js";
import todoRoute from "./todo.route.js";
import notificationRoute from "./notification.route.js";

const router = Router();

router.use("/user", userRoute);
router.use("/chef", chefRoute);
router.use("/coach", coachRoute);
router.use("/client", clientRoute);
router.use("/message", messageRoute);
router.use("/todo", todoRoute);
router.use("/notification", notificationRoute);




export default router;