import Joi from "joi";

export const createMessageSchema = Joi.object({
  text: Joi.string().required().allow(""),
});
