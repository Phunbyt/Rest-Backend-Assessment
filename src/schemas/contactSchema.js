const Joi = require("joi");

function contactSchema(user) {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
    }),
    phone: Joi.string().min(4).max(10).required(),
    gender: Joi.any().valid("male", "female").required(),
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
  });
  return schema.validate(user);
}

module.exports = {
  contactSchema,
};
