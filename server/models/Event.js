//Needs Double Check

const { Schema, model } = require("mongoose");
const User = require('./User');

const eventSchema = new Schema({
  host: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  attendees: {
    type: String,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Event = model("Event", eventSchema);

module.exports = Event;
