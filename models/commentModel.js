const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
 
    idPost: { type: String, required: true },
    author: { type: String, required: false },
    content: { type: String, required: false },
}, {
  timestamps: true
} ,

)
module.exports = mongoose.model('Comment', commentSchema)