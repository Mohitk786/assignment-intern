import { useState } from "react";
import toast from "react-hot-toast";
import { CREATE_EVENT } from "../services/Event/event";
import { Link } from "react-router-dom";

export default function EventForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    eventDateTime: "",
    ticketPrice: "",
    category: "conference",
  });
  const [isCreated, setIsCreated] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await CREATE_EVENT(formData);
      if (response.status) {
        toast.success(response.message);
        setIsCreated(true);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Server error, please try again later.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-10 bg-gray-900 text-white shadow-lg rounded-xl border border-gray-700">
      <h2 className="text-4xl font-bold mb-8 text-center uppercase tracking-wide text-green-400">Create Your Epic Event</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          required
          value={formData.title}
          onChange={handleChange}
          className="p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400"
        />
        <input
          type="text"
          name="city"
          placeholder="Event City"
          required
          value={formData.city}
          onChange={handleChange}
          className="p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400"
        />
      
        <input
          type="datetime-local"
          name="eventDateTime"
          required
          value={formData.eventDateTime}
          onChange={handleChange}
          className="p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
        />
        <input
          type="number"
          name="ticketPrice"
          placeholder="Ticket Price (₹)"
          required
          min="0"
          value={formData.ticketPrice}
          onChange={handleChange}
          className="p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
        >
          <option value="conference">Conference</option>
          <option value="workshop">Workshop</option>
          <option value="meetup">Meetup</option>
        </select>
        <textarea
          name="description"
          placeholder="Describe Your Event"
          required
          value={formData.description}
          onChange={handleChange}
          className="col-span-2 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400"
        />
        <button
          type="submit"
          className="col-span-2 bg-green-500 hover:bg-green-600 transition-all p-4 rounded-lg text-xl font-bold shadow-lg"
        >
          Create Event 🚀
        </button>
      </form>
      {isCreated && (
        <div className="text-center mt-6">
          <Link to="/user/dashboard" className="text-lg font-semibold text-green-400 hover:underline">
            Go to Dashboard →
          </Link>
        </div>
      )}
    </div>
  );
}