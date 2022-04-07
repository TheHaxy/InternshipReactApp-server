const express = require("express")
const passport = require("passport");
const controller = require("../controllers/profile")
const router = express.Router()

router.patch('/profile', passport.authenticate("jwt", {session: true}), controller.changeProfile)

module.exports = router