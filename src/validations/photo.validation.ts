import * as Joi from 'joi';

const photoValidation = Joi.object({
  name: Joi.string().min(5).required(),
  converted_name: Joi.string().min(5).required(),
  client_name: Joi.string().min(5).required(),
  url: Joi.string().required(),
  user: Joi.number().required(),
});

export default photoValidation;
