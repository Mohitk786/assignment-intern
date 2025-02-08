const {uploadImageToCloudinary} = require("../config/imageUploader");
const Event = require("../models/Event");
const User = require("../models/User");

exports.createEvent = async (req, res) => {
    try {
        const { name, description, date, city, category } = req.body;
        
        const eventImage = req.files.eventImage;

        const cloudinaryEventImage = await uploadImageToCloudinary(
            eventImage,
            process.env.CLOUD_FOLDER_NAME
          )

        const newEvent = new Event({
          name,
          description,
          date,
          city,
          category,
          image: cloudinaryEventImage.secure_url,
          owner: req.user.id, 
        });
        const event = await newEvent.save();

        await User.findByIdAndUpdate(req.user.id, { $push: { events: event.id } });

        res.status(201).json({ message: "Event created successfully", event: newEvent });
      } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ error: "Server error, please try again later." });
      }
}

exports.joinEvent = async (req, res) => {
  try {
    let event = await Event.findByIdAndUpdate(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    // if (event.attendees.includes(req.user.id)) {
    //   return res.status(400).json({ error: "Already joined this event" });
    // }

     event = await Event.findByIdAndUpdate(req.params.id, { $push: { attendees: req.user.id } }, {new: true});


    req.io.emit("updateAttendeeCount",{
      attendees: event.attendees.length,
      eventId: event._id.toString()
    });


    res.json({ message: "Joined event successfully", attendees: event.attendees.length });

  } catch (error) {
    console.error("Error joining event:", error.message);
    res.status(500).json({ error: "Error joining event" });
  }
}

exports.eventDetails =  async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("hostName");
    if (!event) return res.status(404).json({ error: "Event not found" });
    
    res.json({
      data: event
    });

  } catch (error) {
    res.status(500).json({ error: "Error fetching event details" });
  }
};


exports.allEvents = async (req, res) => { 
  try {
    const events = await Event.find({}).populate("hostName");
    res.json({
      data: events
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Error fetching events" });
  }
}