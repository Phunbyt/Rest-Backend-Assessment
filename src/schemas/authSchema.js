const Joi = require("joi");

function signInSchema(user) {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
    }).required(),

    username: Joi.string().alphanum().min(3).max(30).required(),

    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

    name: Joi.string().min(3).max(30).required(),
  });
   return schema.validate(user);


}

module.exports = {
  signInSchema,
};
