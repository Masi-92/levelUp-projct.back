import mongoose from "mongoose";
import dotenv from "dotenv";
import {createSuperAdmin }  from  "./../seed.js"
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, { dbName: process.env.DATABASE })
  .then(() => {
 //createSuperAdmin()
    return console.log("Connected to mongoDB");
  })

  .catch((error) => console.log("Connection error: ", error.message));