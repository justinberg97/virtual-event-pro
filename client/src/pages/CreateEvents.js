import React, { useState } from "react";
import { Container, Jumbotron, Card, CardColumns, Button } from "react-bootstrap";

function EventForm() {
  const [eventData, setEventData] = useState({
    host: "",
    title: "",
    description: "",
    attendees: "",
    eventID: ""
  });

  const handleChange = (event) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // logic to submit the form data
  };

  return (
    <Container>
      <Jumbotron>
        <h1 className="text-center">Create Event</h1>
        <CardColumns>
          <Card>
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="host">Host</label>
                  <input
                    type="text"
                    className="form-control"
                    id="host"
                    name="host"
                    value={eventData.host}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={eventData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="attendees">Attendees</label>
                  <input
                    type="text"
                    className="form-control"
                    id="attendees"
                    name="attendees"
                    value={eventData.attendees}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eventID">Event ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="eventID"
                    name="eventID"
                    value={eventData.eventID}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit">Create Event</Button>
              </form>
            </Card.Body>
          </Card>
        </CardColumns>
      </Jumbotron>
    </Container>
  );
}

export default CreateEvents;


// import React from 'react';
// import {
//   Jumbotron,
//   Container,
//   CardColumns,
//   Card,
//   Button,
// } from 'react-bootstrap';


// import { useQuery, useMutation } from '@apollo/client';
// import { QUERY_ME } from '../utils/queries';
// import { REMOVE_EVENT } from '../utils/mutations';
// import { removeEventId } from '../utils/localStorage';

// import Auth from '../utils/auth';

// const CreateEvent = () => {
//   const [eventData, setEventData] = useState({
//     host: "",
//     description: "",
//     attendees: "",
//     eventId: 0,
//     option: {
//       webLink: "",
//       title: ""
// }});
// };
//   const handleInputChange = event => {
//     const { name, value } = event.target;
//     setEventData({
//       ...eventData,
//       [name]: value
//     });
//   };
//   const handleOptionChange = event => {
//     const { name, value } = event.target;
//     setEventData({
//       ...eventData,
//       option: {
//         ...eventData.option,
//         [name]: value
//       }
//     });
//   };
//   const handleSubmit = event => {
//     event.preventDefault();
//     console.log(eventData);
//     setEventData({
//       host: "",
//       description: "",
//       attendees: "",
//       eventId: 0,
//       option: {
//         webLink: "",
//         title: ""
//       }
//     });
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="host">Host:</label>
//         <input
//           type="text"
//           id="host"
//           name="host"
//           value={eventData.host}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="description">Description:</label>
//         <input
//           type="text"
//           id="description"
//           name="description"
//           value={eventData.description}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="attendees">Attendees:</label>
//         <input
//           type="text"
//           id="attendees"
//           name="attendees"
//           value={eventData.attendees}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="eventId">Event ID:</label>
//         <input
//           type="number"
//           id="eventId"
//           name="eventId"
//           value={eventData.eventId}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="webLink">Web Link:</label>
//         <input
//           type="text"
//           id="webLink"
//           name="webLink"
//           value={eventData.option.webLink}
//           onChange={handleOptionChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="title">Title:</label>
//         <input
//           type="text"
//           id="title"
//           name="title"
//           value={eventData.option.title}
//           onChange={handleOptionChange}
//         />
//       </div>
//       <button type="submit">Create Event</button>
//     </form>
//   );
// export default CreateEvent;
