import Joi from 'joi';

export const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(20).required(),
  role: Joi.string().valid('ADMIN', 'USER').required(),
});
