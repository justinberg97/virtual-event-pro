//needs review

const { AuthenticationError } = require("apollo-server-express");
const { Event, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userEvents = await Event.find({ user: context.user._id }).select(
          "-__v"
        );
        context.user.savedEvents = userEvents;
        return context.user;
      }

      throw new AuthenticationError("Not logged in");
    },
    searchEvents: async (parent, { searchText }, context) => {
      if (context.user) {
        const userEvents = await Event.find({
          $or: [
            { title: { $regex: searchText, $options: "i" } },
            { host: { $regex: searchText, $options: "i" } },
          ],
        }).select("-__v").lean();
        const filteredEvents = [];
        userEvents.forEach(event => {
          const existingEvent = filteredEvents.findIndex(ev => ev.host === event.host && ev.title === event.title && ev.description === event.description);
          if (existingEvent > -1) {
            if(JSON.stringify(event.user) === JSON.stringify(context.user._id)) filteredEvents[existingEvent] = event;
          } else {
            filteredEvents.push(event);
          }
        });
        return filteredEvents;
      }

      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveEvent: async (parent, { eventData }, context) => {
      if (context.user) {
        await Event.create(eventData);
        const userEvents = await Event.find({ user: context.user._id }).select(
          "-__v"
        );
        context.user.savedEvents = userEvents;
        return context.user;
      }

      throw new AuthenticationError("You must be logged in");
    },
    removeEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        await Event.deleteOne({ _id: eventId });
        const userEvents = await Event.find({ user: context.user._id }).select(
          "-__v"
        );
        context.user.savedEvents = userEvents;
        return context.user;
      }

      throw new AuthenticationError("You must be logged in");
    },

    attendEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { attendEvents: { eventId } } },
          { new: true }
        );
        return updatedUser;
      }
    },
  },
};

module.exports = resolvers;
