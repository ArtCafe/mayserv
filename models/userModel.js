const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    text: {
      type: String,  default: "" },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    avatar: { type: String, default: "" },

    role: { type: Number, default: 0, },
 
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
