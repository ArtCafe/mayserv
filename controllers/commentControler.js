const asyncHandler = require('express-async-handler')
const Comment = require('../models/commentModel')
// @desc    Get goals
// @route   GET /api/goals
// @access  Private


const getComments = asyncHandler(async (req, res) => {

const idPost  = req.body.idPost;

  const comments = await Comment.find( {idPost: idPost} )

  res.status(200).json(comments)
})


  const createComment = asyncHandler(async (req ,res) => {
  
  try {
    const { 
      content,
     idPost,
     author
    } = req.body

    const newComment = new Comment({ 
      author,
      content,
      idPost,

    })




    await newComment.save()

    return res.json(newComment )
    
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
});
// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const user = req.body.user
  const commentI =req.body.comment._id
  const commentC = await Comment.findById(commentI)

  if (!commentC) {
    res.status(400)
    throw new Error('Goal not found')
  }
console.log("req.user.id", req.user.id);
  // Check for user
  //if (!req.user) {
    if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (commentC.post_user_id.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await commentC.remove()

  res.status(200).json("removed",{ id: req.commentC._id })
})

module.exports = {
 
  getComments,
 createComment,
  deleteComment,
}
