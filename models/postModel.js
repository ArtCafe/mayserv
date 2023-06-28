
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    imgUrl: {
        type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    text: {
      type: String,
      required: [false, 'Please add a text value'],
    },
    title: {
      type: String,
      required: [false, 'Please add a text value'],
    },
}, {
  timestamps: true
} ,

{
    collection: 'posts'
})
module.exports = mongoose.model('Post', postSchema)