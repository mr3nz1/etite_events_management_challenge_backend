import { required } from "joi";
import mongoose, { InferSchemaType, Schema, Document } from "mongoose";
import { v4 as uuid } from "uuid";

const bookingSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    numberOfTickets: {
      type: Number,
      required: true,
    },
    cancelled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

type bookingSchemaType = InferSchemaType<typeof bookingSchema>;

const BookingModel = mongoose.model<bookingSchemaType>(
  "Booking",
  bookingSchema
);

export default BookingModel;
