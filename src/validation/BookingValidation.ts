import Joi, { Schema } from "joi";

const CreateBookingSchema: Schema = Joi.object({
  numberOfTickets: Joi.number().required(),
});

const UpdateBookingSchema: Schema = Joi.object({
  numberOfTickets: Joi.number(),
  cancelled: Joi.boolean(),
});

export { CreateBookingSchema, UpdateBookingSchema };
