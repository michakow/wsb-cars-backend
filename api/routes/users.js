const express = require('express');

const UsersController = require('../controllers/users');
const router = express.Router();

router.get('/', UsersController.getUsers);
router.post('/signup', UsersController.signUp);
router.post('/signin', UsersController.signIn);

module.exports = router;
