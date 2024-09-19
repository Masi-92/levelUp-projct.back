import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from 'url';
import routes from "./routers/index.js";
import path from 'path'
import "./utils/mongodb.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT  ; 
const DB_URL = process.env.DB_URL;
const app = express();


app.use("/uploads",express.static("uploads"));
app.use(express.static(__dirname + "/client"))
app.use(express.json());
app.use(cors());




app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});

app.use("/api", routes);

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});
//createSuperAdmin()