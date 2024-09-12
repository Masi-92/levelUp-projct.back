import Joi from "joi";
import './objectId.schema.js'

export const createTerminSchema = Joi.object({
  subject: Joi.string().required(),
  coach: Joi.objectId().required(),
  client: Joi.objectId(),
  clientName: Joi.string().allow(""),
  date: Joi.string().required(),
});

