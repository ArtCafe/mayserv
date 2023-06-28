const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

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

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      text: user.text,
      role: user.role,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    })  
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
  res.json({ email})
})

/*
const updateUser = async (req, res, next) => {

  const url = req.protocol + '://' + req.get('host')

  const { text, user , name, id} = req.body

  console.log(id);
  

  const update = { 
     text,
     name,
     avatar: url + '/public/' + req.file.filename
                  };
   
  try {   
      
    if (! id) {
      throw new Error("User not found");
    }

    
const updatedUser = await User.findByIdAndUpdate(id, update, {
  new: true,
})
const user = await User.findById(id)

    res.json({ user, updatedUser 
  
    });

  } catch (error) {
    next(error);
  }
};
*/
 const updateProfile = async (req, res) => {
  try {
    const { name, text, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
   // const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
       // password: hashedPassword || user.password,
       // phone: phone || user.phone,
       // address: address || user.address,
       text: text || user.text,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}
const getUser = asyncHandler(async (req, res) => {
  const { idUser } = req.body
console.log(idUser);
  // Check for user email
  const user = await User.findById({_id: idUser })

 
    res.json({
      _id: user.id,
      name: user.name,
      text: user.text,
      role: user.role,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    })  

  
})

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
  getMe,
  getUser
}
