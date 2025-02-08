const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  hostName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  city: { type: String, required: true },
  image: { type: String },
  eventDateTime: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  category: {
    type: String,
    enum: ["conference", "workshop", "meetup"],
    required: true,
  },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", EventSchema);
