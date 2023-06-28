const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @desc    Register new user
// @route   POST /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
  
  if ( !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const user = await User.find()

  if (user) {
    res.status(400)
    throw new Error('User already exists')
  }

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})
module.exports = {
    getUsers,

  }
  