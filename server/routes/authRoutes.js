const express = require("express")
const router = express.Router()

const {
  login,
  signup,
  
} = require("../controller/Auth")


router.post("/auth/login", login)
router.post("/auth/signup", signup)


module.exports = router