import { Router } from "express";
import {
    createJobCenterTeam,
    deleteJobCenterTeam,
    getJobCenterTeam,
    getJobCenterTeamById,
    updateJobCenterTeam,
} from "../controllers/jobCenter.controller.js";
import { auth } from "../middleware/auth.js";

const route = Router();

route.post("/createJobCenterTeam", auth, createJobCenterTeam);
route.put("/updateJobCenterTeam/:id", auth, updateJobCenterTeam);
route.delete("/deleteJobCenterTeam/:id", auth, deleteJobCenterTeam);
route.get("/getJobCenterTeam", auth, getJobCenterTeam);
route.get("/getJobCenterTeamById/:id", auth, getJobCenterTeamById);

export default route;
