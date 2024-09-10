import clientModel from "../models/client.model.js";

export const createMassname = async (req, res) => {
  const { title, from, to, massnameTime, description, client,massnamesignature } = req.body;

  const clientData = await clientModel.findById(client);
  if (!clientData) return res.status(400).send({ message: "client not found" });
  if (clientData.massname) return res.status(400).send({ message: "this client has already a massname" });

  clientData.massname = {
    title,
    from,
    to,
    massnameTime,
    restTime: massnameTime,
   massnamesignature,
   description,
    
  };

  await clientData.save();

  res.sendStatus(200);
};

export const updateMassname = async (req, res) => {
  const { id } = req.params;
  const { title, from, to, massnameTime, description, client,massnamesignature } = req.body;

  if (!client) return res.status(400).send({ message: "Der Client muss gesendet werden" });
  const clientData = await clientModel.findById(client);
  if (!clientData) return res.status(400).send({ message: "Client nicht gefunden" });
  if (!clientData.massname) return res.status(400).send({ message: "dieser Client hat keinen Maßnname" });

  if (title) clientData.massname.title = title;
  if (from) clientData.massname.from = from;
  if (to) clientData.massname.to = to;
  if (massnameTime) clientData.massname.massnameTime = massnameTime;
  if (description) clientData.massname.description = description;
  if (massnamesignature) clientData.massname.massnamesignature=massnamesignature
  await clientData.save();
  res.sendStatus(200);
};

export const deleteMassname = async (req, res) => {
  const { id: clientId } = req.params;
  const client = await clientModel.findById(clientId);
  if (!client) return res.status(404).send({ message: "Client nicht gefunden" });
  client.massname = undefined;
  await client.save();
  res.sendStatus(200);
};

export const getMassname = async (req, res) => {
  const { client } = req.params;
  const massname = (await clientModel.findById(client)).massname;
  res.send(massname);
};

