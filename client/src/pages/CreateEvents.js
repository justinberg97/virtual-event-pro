import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_EVENT } from '../utils/mutations';
import { removeEventId } from '../utils/localStorage';
const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    host: "",
    description: "",
    attendees: "",
    eventId: 0,
    option: {
      webLink: "",
      title: ""
}});
};
  const handleInputChange = event => {
    const { name, value } = event.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };
  const handleOptionChange = event => {
    const { name, value } = event.target;
    setEventData({
      ...eventData,
      option: {
        ...eventData.option,
        [name]: value
      }
    });
  };
  const handleSubmit = event => {
    event.preventDefault();
    // Call API to save the eventData to the database or store it in local state
    console.log(eventData);
    setEventData({
      host: "",
      description: "",
      attendees: "",
      eventId: 0,
      option: {
        webLink: "",
        title: ""
      }
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="host">Host:</label>
        <input
          type="text"
          id="host"
          name="host"
          value={eventData.host}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={eventData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="attendees">Attendees:</label>
        <input
          type="text"
          id="attendees"
          name="attendees"
          value={eventData.attendees}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="eventId">Event ID:</label>
        <input
          type="number"
          id="eventId"
          name="eventId"
          value={eventData.eventId}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="webLink">Web Link:</label>
        <input
          type="text"
          id="webLink"
          name="webLink"
          value={eventData.option.webLink}
          onChange={handleOptionChange}
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={eventData.option.title}
          onChange={handleOptionChange}
        />
      </div>
      <button type="submit">Create Event</button>
    </form>
  );
export default CreateEvent;