import { required } from "joi";
import mongoose, { InferSchemaType, Schema, Document } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
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
    boughtTickets: {
      type: Number,
      default: 0,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

type EventSchemaType = InferSchemaType<typeof eventSchema>;

const EventModel = mongoose.model<EventSchemaType>("Event", eventSchema);

export default EventModel;
