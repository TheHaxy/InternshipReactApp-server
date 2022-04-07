const Article = require("../models/article")
const User = require("../models/user")
const errorHandler = require("../utils/errorHandler");

module.exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getMyArticles = async (req, res) => {
  const articles = await Article.find({author: req.user._id});
  try {
    res.status(200).json(articles);
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.createArticle = async (req, res) => {
  const candidate = await User.findOne({_id: req.user._id})

  const newArticle = new Article({
    title: req.body.title,
    category: req.body.category,
    text: req.body.text,
    image: req.body.image,
    authorImage: candidate.image,
    author: candidate._id,
    authorName: `${candidate.firstName} ${candidate.lastName}`,
    date: req.body.date,
    views: req.body.views
  })
  try {
    await newArticle.save()
    res.status(201).json(newArticle)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.onclickArticle = async (req, res) => {
  try {
    await Article.updateOne(
        {_id: req.body._id},
        {
          $set: {
            views: req.body.views
          }
        }
    )
    const candidate = await Article.findOne({_id: req.body._id})
    res.status(200).json(candidate)
  } catch (e) {
    errorHandler(res, e)
  }
}