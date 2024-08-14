const express = require("express")
const { getAllMessage } = require("../controllers/messageController")
const isAuthentication = require("../middlewares/Authentication")

const router = express.Router()

router.post("/allMessages" , isAuthentication ,getAllMessage)

module.exports = router