const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "organizer", "attendee"], default: "attendee" },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  eventsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: [],
    },
  ],
  eventsCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: [],
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports =  mongoose.model("User", UserSchema);


