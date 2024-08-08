import { Router } from "express";
import { getTracks } from "../controllers/track.controller.js";

const router = Router();

router.get("/", getTracks);

export default router;
