import Joi, { Schema } from "joi";

const RegisterUserSchema: Schema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  admin: Joi.boolean(),
});

const LoginUserSchema: Schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const UpdateUserSchema: Schema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  password: Joi.string(),
  admin: Joi.boolean(),
});

export { RegisterUserSchema, LoginUserSchema, UpdateUserSchema };
