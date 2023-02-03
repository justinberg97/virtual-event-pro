const db = require("./connection");
const { User, Event } = require("../models");

db.once("open", async () => {
  //await Event.deleteMany();

  await Event.create(
    {
      eventId: "1",
      host: "Anderson",
      description: "Group meeting",
      image: "picture",
      attendees: "Mike, Jimmy",
      link: "www.google.com",
      title: "Anderson's Group Meeting",
    },
  );

  console.log("events seeded");

  await User.deleteMany();

  await User.create({
    _id: "123456789101",
    username: 'amourot',
    email: "pamela@testmail.com",
    eventCount: 1,
    savedEvents: [],
    password: 'password12345',
    attendEvents: "",
  });

  await User.create({
    _id: "123456789102",
    username: 'amourot1',
    email: "pam1ela@testmail.com",
    eventCount: 1,
    savedEvents: [],
    password: 'password123415',
    attendEvents: "",
  });

  console.log("users seeded");

  process.exit();
});
