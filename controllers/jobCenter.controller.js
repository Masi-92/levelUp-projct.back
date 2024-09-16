import jobCenterTeamModel from "../models/jobCenterTeam.model.js";

export const createJobCenterTeam = async (req, res) => {
  const { number, personnel, email, phone, tel } = req.body;

  const jobCenter = await jobCenterTeamModel.findOne({ number });
  if (jobCenter) return res.status(400).send({ message: "jobCenterTeam with number already exist!" });
  const jobCenterTeam = await jobCenterTeamModel.create({
    number,
    personnel,
    email,
    phone,
    tel,
  });

  res.send(jobCenterTeam);
};

export const updateJobCenterTeam = async (req, res) => {
  const { id } = req.params;
  const { personnel, email, phone, tel } = req.body;

  const updateBody = {};
  if (personnel) updateBody.personnel = personnel;
  if (email) updateBody.email = email;
  if (phone) updateBody.phone = phone;
  if (tel) updateBody.tel = tel;

  const jobCenterTeam = await jobCenterTeamModel.findByIdAndUpdate(id, { $set: updateBody }, { new: true });
  if (!jobCenterTeam) return res.status(404).send({ message: "jobCenterTeam nicht gefunden" });
  res.send(jobCenterTeam);
};

export const deleteJobCenterTeam = async (req, res) => {
  const { id } = req.params;
  const jobCenterTeam = await jobCenterTeamModel.findByIdAndDelete(id);
  if (!jobCenterTeam) return res.status(404).send({ message: "jobCenterTeam nicht gefunden" });
  res.send(jobCenterTeam);
};

export const getJobCenterTeam = async (req, res) => {
  const search = req.query.search || "";
  const searchRegex = new RegExp(search, "i");
  const jobCenterTeams = await jobCenterTeamModel.find({
    $or: [
      { number: { $regex: searchRegex } },
      { personnel: { $regex: searchRegex } },
      { email: { $regex: searchRegex } },
      { phone: { $regex: searchRegex } },
      { tel: { $regex: searchRegex } },
    ],
  });
  res.send(jobCenterTeams);
};

export const getJobCenterTeamById = async (req, res) => {
  const { id } = req.params;
  const jobCenterTeam = await jobCenterTeamModel.findById(id);
  res.send(jobCenterTeam);
};
