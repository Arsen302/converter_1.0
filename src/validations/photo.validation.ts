import * as Joi from 'joi';

const photoValidation = Joi.object({
  name: Joi.string().min(5).required(),
  convertedName: Joi.string().min(5).required(),
  clientName: Joi.string().min(5).required(),
  url: Joi.string().required(),
  user: Joi.number().required(),
});

export default photoValidation;
