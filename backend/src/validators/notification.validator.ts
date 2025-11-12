import Joi from "joi";

export const notificationSchema = Joi.object({
  userId: Joi.string(),
  title: Joi.string().required(),
  message: Joi.string().required(),
  link: Joi.string().required(),
  read: Joi.bool(),
});
