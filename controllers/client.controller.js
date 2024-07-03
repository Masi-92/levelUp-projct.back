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

  export const deleteClient = async (req, res) => {
    const { id } = req.params;
    const client = await clientModel.findByIdAndUpdate(id, { $set: { isDeleted: true } });
    if (!client) return res.status(404).send({ message: "client not found" });
    res.send(client);
  };

  export const getClient = async (req, res) => {
    const search = req.query.search || "";
    const searchRegex = new RegExp(search, "i");
    const clients = await clientModel.find({
      isDeleted: false,
      $or: [
        { firstName: { $regex: searchRegex } },
        { lastName: { $regex: searchRegex } },
        { clientNumber: { $regex: searchRegex } },
      ],
    });
    res.send(clients);
  };


  
  export const getClientById = async (req, res) => {
    const { id } = req.params;
    const client = await clientModel.findOne({ _id: id, isDeleted: false });
    res.send(client);
  };