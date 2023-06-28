const express = require('express')
const router = express.Router()
const {
  createComment,
  getComments,
  deleteComment,
} = require('../controllers/commentControler')   

const { protect } = require('../middleware/authMiddleware')
router.route('/').post( createComment)
router.route('/get').post( getComments)
router.route('/:id').delete(protect, deleteComment)
router.route('/id').post( getComments)
module.exports = router
