import Joi from "joi";
import { ROLES } from "../models/user.model.js";

export const createCoachSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().allow(""),
  fullName: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().required(),
  image: Joi.string(),
  role: Joi.string().valid(ROLES.COACH, ROLES.SECRETARY).required(),
});
