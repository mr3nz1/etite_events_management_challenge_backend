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
    date: {
      type: Date,
      required: true,
    },
    numberOfTickets: {
      type: Number,
      required: true,
    },
    attendees: {
      type: Number,
      default: 0,
    },
    cancelled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

type EventSchemaType = InferSchemaType<typeof eventSchema>;

const EventModel = mongoose.model<EventSchemaType>("Event", eventSchema);

export default EventModel;
