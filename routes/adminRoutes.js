const express = require('express')
const upload = require('../uploads/upload')
const router = express.Router()


const {
  getUsers,
} = require('../controllers/dashboardControler')
const { isAdmin } = require('../middleware/adminMidleware')
router.route('/').get(isAdmin, getUsers)
//router.post('', isAdmin, getUsers)
//router.put('/update', upload.single('avatar'),protect, updateProfile )
module.exports = router
  