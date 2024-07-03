import clientModel from "../models/client.model.js";

export const createClient = async (req, res) => {
    if (user) return res.status(400).send({ message: "client with username already exist!" });
    const client = await clientModel.create(req.body);
  
    res.send(client);
  };


  export const updateClient = async (req, res) => {
    const { id } = req.params;
  
    const client = await clientModel.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    if (!client) return res.status(404).send({ message: "client not found" });
    res.send(client);
  };