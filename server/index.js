const express = require("express");
const http = require("http"); // Import HTTP module for WebSockets
const { Server } = require("socket.io"); // Import Socket.IO
const app = express();

const database = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

// Connect to database
database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use((req, res, next) => {
  // Allow requests from your specific domain
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  // Allow credentials (cookies, authorization headers, etc.)
  res.header("Access-Control-Allow-Credentials", true);

  // Specify allowed methods and headers
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // Continue to the next middleware
  next();
});

// File upload configuration
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// Cloudinary connection
cloudinaryConnect();

app.use((req, res, next) => {
  req.io = io;
  next();
});
// Routes
app.use("/event", eventRoutes);
app.use("", authRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// **Create an HTTP server to enable WebSockets**
const server = http.createServer(app);

// **Initialize Socket.IO**

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  socket.on("joinEvent", (eventId) => {
    socket.join(eventId);
    console.log(`User joined event room: ${eventId}`);
  });

  socket.on("leaveEvent", async ({ eventId, userId }) => {
    console.log(`User ${userId} left event: ${eventId}`);

    const event = await Event.findByIdAndUpdate(
      eventId,
      { $pull: { attendees: userId } },
      { new: true }
    );

    io.to(eventId).emit("updateAttendeeCount", {
      attendees: event.attendees.length,
      eventId: eventId,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// **Use `server.listen` instead of `app.listen`**
server.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
