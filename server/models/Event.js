//Needs Double Check

const { Schema } = require('mongoose');

const eventSchema = new Schema({
  host: [
    {
      type: String,
    },
  ],
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

module.exports = eventSchema;

