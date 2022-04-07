const errorHandler = require("../utils/errorHandler")
const User = require("../models/user");

module.exports.changeProfile = async (req, res) => {
  try {
  if (req.body.firstName) {
    await User.updateOne(
        {_id: req.user._id},
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            description: req.body.description,
            image: req.body.image
          }
        })
    res.status(200).json(req.body)
  } else {
    const candidate = await User.findOne({_id: req.user._id})
      const profile = {
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        image: candidate.image,
        description: candidate.description
      }
      res.status(200).json(profile)
    }
  } catch (e) {
    errorHandler(res, e)
  }
}