//VALIDATION
const Joi = require('joi');

//Register Validation
const registerValidation = (data) => {

  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .max(30)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });

  return schema.validate(data);
};

// Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });

  return schema.validate(data);
};

const createDataValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().
      min(2).
      max(32).
      required(),
    url: Joi.string()
      .min(10)
      .max(255)
      .required()
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.createDataValidation = createDataValidation;
