const express = require('express')
const upload = require('../uploads/upload')
const router = express.Router()

const {
  registerUser,
  loginUser,
  getMe,
  getUser,
  updateProfile
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/user', getUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.put('/update', upload.single('avatar'),protect, updateProfile )
module.exports = router
  