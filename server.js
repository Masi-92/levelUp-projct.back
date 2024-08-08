import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import routes from "./routers/index.js";
import "./utils/mongodb.js";
import {createSuperAdmin} from "./seed.js" 
dotenv.config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const app = express();


app.use("/uploads",express.static("uploads"));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});

app.use("/api", routes);

 //createSuperAdmin()