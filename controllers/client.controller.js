import clientModel from "../models/client.model.js";

export const createClient = async (req, res) => {
    if (user) return res.status(400).send({ message: "client with username already exist!" });
    const client = await clientModel.create(req.body);
  
    res.send(client);
  };