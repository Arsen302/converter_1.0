import * as Joi from 'joi';

const photoValidation = Joi.object({
  name: Joi.string().min(5).required(),
  converted_name: Joi.string().min(5).required(),
  client_name: Joi.string().min(5).required(),
  url: Joi.string().required(),
  // photo: Joi.binary()
  //   .encoding('base64')
  //   .max(5 * 1024 * 1024)
  //   .required(),
  user: Joi.number().required(),
});

// const photoValidation = Joi.object({
//   fieldname: Joi.string().min(5).required(),
//   originalname: Joi.string().min(5).required(), // with jpg, jpeg, png
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination:
//     'C:\\Users\\arsen.arakelian\\Desktop\\projects\\converter\\src\\uploads',
//   filename: '7bb73c1e1106658df47269644c4b0ac4.png',
//   path:
//     'C:\\Users\\arsen.arakelian\\Desktop\\projects\\converter\\src\\uploads\\7bb73c1e1106658df47269644c4b0ac4.png',
//   size: Joi.binary()
//     .encoding('base64')
//     .max(5 * 1024 * 1024)
//     .required(),
// });

export default photoValidation;
