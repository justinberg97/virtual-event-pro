//Needs Double Check

const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  host: {
    type: String,
  },
  description: {
    type: String,
    required: false,
  },

  attendees: {
    type: String,
    require: false,
  },

  eventId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

const Event = model("Event", eventSchema);

module.exports = Event;
