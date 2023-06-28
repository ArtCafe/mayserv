const asyncHandler = require('express-async-handler')
//const upload = require('../uploads/upload')
//const {v4: uuidv4} = require ("uuid")
const Post = require('../models/postModel')
const User = require('../models/userModel')
//const public = require('../public')
const fs = require('fs-extra')
const path = require('path')
const mongoose = require('mongoose');

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()

  res.status(200).json(posts)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private


 const setPost = async(req, res ) => {
    const url = req.protocol + '://' + req.get('host')
    const name =req.body.name
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
       // name: req.body.name,
        name: name,
        text: req.body.text,
        title:  req.body.title,
       // user: req.user.id,
        imgUrl: url + '/public/' + req.file.filename
    });
    post.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
            userCreated: {
                _id: result._id,
                image: result.image
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
}



// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedPost)
})
/*const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedGoal)
})
 */

// @desc    Get goals
// @route   GET /api/posts/:id
// @access  Private
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById( {_id: req.params.id})
console.log(req.params.id);
  res.status(200).json(post)
})


// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private

const deletePost = async (req, res) => {
  try {
  
    await Post.findByIdAndDelete(req.params.id);
  
   
   // await Post.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};
/*
 const deletePost = async (req, res) => {

  try {
     const post = await Post.findById({_id: req.params.id});
      if(!post){
          return res.send({Error: 'Could not find your post'})
      }

      const oldimage = {image: post.image} ;   
      if (oldimage) {
        const oldPath = path.join(__dirname, "../public", "images", oldimage);
        if (fs.existsSync(oldPath)) {
          fs.unlink(oldPath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            res.status(200);
          });
        }
      }
    
  
      await Post.findByIdAndDelete(req.params.id);
     
      res.status(200)
  } catch (error) {
      res.send({Error: error})
  }
 
  
  
}

*/

module.exports = {
  getPosts,
  getPost,
  setPost,
  updatePost,
  deletePost,
}
