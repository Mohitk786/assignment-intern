import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { EVENT_DETAILS, JOIN_EVENT } from "../services/Event/event";

const socket = io("http://localhost:5000"); 

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState(0);
  const [joined, setJoined] = useState(false);
  
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    fetchEventDetails();

    socket.on("updateAttendeeCount", ({ attendees, eventId }) => {
      if(eventId === id){
      console.log("Real-time attendee update received:", attendees);                                    
      setAttendees(attendees); 
      }
    });

    const handleBeforeUnload = () => {
      socket.emit("leaveEvent", { eventId: id, userId });
    };
    //disconnect on tabClose
    window.addEventListener("beforeunload", handleBeforeUnload);
  

    //clean up
    window.removeEventListener("beforeunload", handleBeforeUnload);
    return () => socket.off("updateAttendeeCount");

  }, []);

  const fetchEventDetails = async () => {
    try {
      const res = await EVENT_DETAILS(id);
      setEvent(res.data);
      setAttendees(res.data.attendees.length);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const joinEvent = async () => {
    try {
      const res = await JOIN_EVENT(id);
      setJoined(true);
      setAttendees(prev => prev + 1);

    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  if (!event) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-6">
      <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        {/* Event Image */}
        <img src={event.image || "https://via.placeholder.com/800x400"} alt={event.title} className="w-full h-64 object-cover" />

        <div className="p-6">
          <h2 className="text-3xl font-bold mb-2">{event.title}</h2>
          <p className="text-gray-400">{event.description}</p>

          {/* Event Details */}
          <div className="grid grid-cols-2 gap-4 my-4">
            <DetailItem icon={<FaMapMarkerAlt />} label="City" value={event.city} />
            <DetailItem icon={<FaCalendarAlt />} label="Date & Time" value={new Date(event.eventDateTime).toLocaleString()} />
            <DetailItem icon={<FaUsers />} label="Attendees" value={attendees} />
            <DetailItem icon={<FaDollarSign />} label="Ticket Price" value={`$${event.ticketPrice}`} />
          </div>

          {/* Join Button */}
          <button
            onClick={joinEvent}
            // disabled={joined}
            className={`w-full py-3 mt-4 text-white font-bold rounded-lg transition ${
              joined ? "bg-green-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {joined ? "✔ Joined" : "Join Event"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Detail Item
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2">
    <div className="text-lg">{icon}</div>
    <p className="text-gray-300">{label}: <span className="text-white font-semibold">{value}</span></p>
  </div>
);

export default EventDetails;
