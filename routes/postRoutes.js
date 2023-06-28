const express = require('express')
const router = express.Router()
const upload = require('../uploads/upload')

const {
  getPosts,
  getPost,
  setPost,
  updatePost,
  deletePost,
} = require('../controllers/postsController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', upload.single('image'),protect, setPost )

router.route('/').get( getPosts)


router.route('/:id').delete( deletePost).put(protect, updatePost).get( getPost)

module.exports = router
