const express = require ("express")
const { register, login, getUserInfo, UpdateProfile, addProfileImage ,removeUploadedFile , logoutUser } = require("../controllers/userController")
const isAuthentication = require("../middlewares/Authentication")

const router = express.Router()




router.post("/register" , register)
router.post("/login" , login)
router.get("/getUserInfo" , isAuthentication ,getUserInfo)
router.patch("/updateProfile" , isAuthentication ,UpdateProfile)
router.post("/addProfileImage" , isAuthentication ,addProfileImage)
router.post("/removeProfile" , isAuthentication ,removeUploadedFile)
router.get("/logoutUser" , isAuthentication ,logoutUser)


module.exports = router