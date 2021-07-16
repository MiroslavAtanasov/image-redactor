const controllers = require('../controllers/user')
const router = require('express').Router()

router.post('/register', controllers.post.register)
router.post('/login', controllers.post.login)
router.post('/verify', controllers.post.verify)

module.exports = router