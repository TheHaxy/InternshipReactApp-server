const mongoose = require("mongoose")
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    text: {
        type: Object,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    author: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    authorName: {
      type: String,
      required: true
    },
    authorImage: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('articles', articleSchema)