import * as Joi from 'joi';

const photoValidation = Joi.object({
  clientName: Joi.string().min(5).required(),
});

export default photoValidation;
