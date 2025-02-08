const express = require("express")
const router = express.Router()

const {auth} = require("../middleware/auth")
const {createEvent, eventDetails, joinEvent, allEvents} = require("../controller/Event")


router.post("/create",auth, createEvent)
router.get("/:id/join", auth, joinEvent)
router.get("/:id/event-stats",auth, eventDetails)
router.get("/all-events", allEvents)

// router.get("/my-events",auth, myEvents)


module.exports = router