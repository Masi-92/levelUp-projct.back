import Joi from "joi";

export const createClientSchema = Joi.object({
  firstName: Joi.string().required().messages({"any.required":"first name ro vared kon"}),
  lastName: Joi.string().required(),
  birthDay: Joi.string().required(),
  gender: Joi.string().required(),
});
