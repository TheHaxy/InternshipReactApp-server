const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const mongoose = require("mongoose")
const User = require("../models/user")
const keys = require("../config/keys")

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
}

module.exports = passport => {
  passport.use(
      new JwtStrategy(options, async (payload, done) => {
        try {
          const user = await User.findById(payload.userId).select("email id")

          passport.serializeUser((user, done) => {
            done(null, user);
          });

          passport.deserializeUser((user, done) => {
            done(null, user);
          });

          if (user) {
            done(null, user)

          } else {
            done(null, false)
          }
        } catch (e) {
          console.log(e)
        }
      })
  )
}