import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import withAuth from "../Auth/WithAuth";
import { FaUsers, FaCalendarAlt, FaMoneyBillWave, FaPlus } from "react-icons/fa";
import { ALL_EVENTS } from "../../services/Event/event";
import { io } from "socket.io-client";
import { REQUEST_URL } from "../../data/constant";

// ✅ WebSocket Connection (initialize only once)
const socket = io(REQUEST_URL);

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalEvents: 0, totalAttendees: 0, totalRevenue: 0 });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchDashboardData();

    socket.on("updateAttendeeCount", (data) => {
      console.log("Real-time attendee update received:", data);
    
      setEvents((prevEvents) => {
        const updatedEvents = prevEvents.map((event) =>
          event._id === data.eventId ? { ...event, attendees: new Array(data.attendees).fill(undefined) } : event
        );
    
        
        const totalAttendees = updatedEvents.reduce((sum, event) => sum + event.attendees.length, 0);
        const totalRevenue = updatedEvents.reduce((sum, event) => sum + event.ticketPrice * event.attendees.length, 0);
    
        setStats((prevStats) => ({
          ...prevStats,
          totalAttendees,
          totalRevenue,
        }));
    
        return updatedEvents;
      });
    });
    
    
    return () => {
      socket.off("updateAttendeeCount");
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await ALL_EVENTS();
      const totalRevenue = res.data.reduce((sum, event) => sum + event.ticketPrice * event.attendees.length, 0);
      const totalAttendees = res.data.reduce((sum, event) => sum + event.attendees.length, 0);

      setStats({ totalEvents: res.data.length, totalAttendees:totalAttendees, totalRevenue:totalRevenue });
      setEvents(res.data);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">🎯 Event Dashboard</h2>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard icon={<FaCalendarAlt />} label="Total Events" value={stats.totalEvents} color="bg-blue-600" />
        <StatCard icon={<FaUsers />} label="Total Attendees" value={stats.totalAttendees} color="bg-green-600" />
        <StatCard icon={<FaMoneyBillWave />} label="Total Revenue" value={`$${stats.totalRevenue}`} color="bg-yellow-500" />
      </div>

      {/* Events List */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">📅 My Events</h3>
          <Link to="/event/create-event" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg flex items-center">
            <FaPlus className="mr-2" /> Create Event
          </Link>
        </div>

        {events.length === 0 ? (
          <p className="text-gray-400">No events found. Start by creating one!</p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event._id}
                onClick={() => navigate(`/event/${event._id}`)}
                className="p-4 cursor-pointer bg-gray-700 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h4 className="text-lg font-semibold">{event.title}</h4>
                  <p className="text-gray-400">{new Date(event.eventDateTime).toDateString()}</p>
                  <p className="text-sm text-gray-400">{event.city} | {event.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400">👥 {event.attendees.length} Attendees</p>
                  <p className="text-yellow-400">💰 ${event.ticketPrice}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ icon, label, value, color }) => (
  <div className={`p-6 rounded-lg shadow-lg ${color} flex items-center space-x-4`}>
    <div className="text-3xl">{icon}</div>
    <div>
      <h4 className="text-lg font-semibold">{label}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default withAuth(Dashboard);
