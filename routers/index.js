import { Router } from "express";
import userRoute from "./user.route.js";
import chefRoute from "./chef.route.js";
import coachRoute from "./coach.route.js";
import clientRoute from "./client.route.js";
import messageRoute from "./message.route.js";
import todoRoute from "./todo.route.js";
import notificationRoute from "./notification.route.js";
import fileRoute from "./file.route.js";
import trackRoute from "./track.route.js";
import noteRoute from "./note.route.js";
import terminRoute from "./termin.route.js";
import massnameRoute from "./massname.route.js";
import jobCenterTeamRoute from "./jobCenter.route.js";

const router = Router();

router.use("/user", userRoute);
router.use("/chef", chefRoute);
router.use("/coach", coachRoute);
router.use("/client", clientRoute);
router.use("/message", messageRoute);
router.use("/todo", todoRoute);
router.use("/notification", notificationRoute);
router.use("/file", fileRoute);
router.use("/track", trackRoute);
router.use("/note", noteRoute);
router.use("/termin", terminRoute);
router.use("/massname", massnameRoute);
router.use("/jobCenterTeam", jobCenterTeamRoute);

export default router;
