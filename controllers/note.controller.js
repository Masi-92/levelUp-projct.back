import noteModel from "../models/note.model.js";

export const createNote = async (req, res) => {
  const userId = req.user.id;

  const note = await noteModel.create({ ...req.body, coach: userId });

  res.send(note);
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const note = await noteModel.findByIdAndDelete(id);
  if (!note) return res.status(404).send({ message: "notiz nicht gefunden" });
  res.send(note);
};

export const getNote = async (req, res) => {
  const { clientId } = req.params;
  const notes = await noteModel.find({
    client: clientId,
  }).sort({createdAt : -1});
  res.send(notes);
};
