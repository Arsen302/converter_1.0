import * as Joi from 'joi';

const photoValidation = Joi.object({
  convertedName: Joi.string().min(5).required(),
  clientName: Joi.string().min(5).required(),
  url: Joi.string().required(),
  user: Joi.number().min(1).required(),
});

export default photoValidation;
