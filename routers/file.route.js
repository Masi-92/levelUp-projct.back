import { Router } from "express";
import { uploadFile } from "../controllers/file.controllers.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "--" + file.originalname);
  },
});

const upload = multer({ storage });

const route = Router();

route.post("/upload", upload.single("file"), uploadFile);

export default route;
