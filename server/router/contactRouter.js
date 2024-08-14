const express = require("express")
const { searchContact } = require("../controllers/contactController")
const isAuthentication = require("../middlewares/Authentication")


const router = express.Router()

router.post("/search" , isAuthentication ,searchContact)

module.exports = router