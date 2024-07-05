import express from "express";
import dotenv from "dotenv";
import routes from "./routers/index.js";
import cors from 'cors';
import "./utils/mongodb.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());



app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});

app.use("/api", routes);


//createSuperAdmin()