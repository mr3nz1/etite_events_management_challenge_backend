import Joi, { Schema, number } from "joi";

const CreateEventSchema: Schema = Joi.object({
  title: Joi.string().required().min(3),
  description: Joi.string().required(),
  location: Joi.string().required(),
  date: Joi.date().required(),
  numberOfTickets: Joi.number().required(),
});

const UpdateEventSchema: Schema = Joi.object({
  title: Joi.string().min(3),
  description: Joi.string(),
  location: Joi.string().required(),
  date: Joi.date(),
  numberOfTickets: Joi.number(),
  cancelled: Joi.boolean(),
});

export { CreateEventSchema, UpdateEventSchema };
