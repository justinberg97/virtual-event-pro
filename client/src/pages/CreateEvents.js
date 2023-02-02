// import React, { useState } from "react";

// const CreateEvent = () => {
//   const [eventName, setEventName] = useState("");
//   const [events, setEvents] = useState([]);

//   const handleSubmit = event => {
//     event.preventDefault();
//     setEvents([...events, eventName]);
//     setEventName("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Enter event name"
//         value={eventName}
//         onChange={event => setEventName(event.target.value)}
//       />
//       <button type="submit">Create Event</button>
//       <ul>
//         {events.map((event, index) => (
//           <li key={index}>{event}</li>
//         ))}
//       </ul>
//     </form>
//   );
// };


// export default CreateEvents;
