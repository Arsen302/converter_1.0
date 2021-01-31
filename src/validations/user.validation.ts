import * as Joi from 'joi';

const userValidation = Joi.object({
  fullName: Joi.string().min(5).required(),
  login: Joi.string().min(5).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

export default userValidation;
