const express = require('express');

const router = express.Router();
const {
  createUser,
  getUser,
  getUsers,
  userSignIn,
  signOut,
} = require('../controllers/user');
const { isAuth } = require('../middlewares/auth');
const {
  validateUserSignUp,
  userVlidation,
  validateUserSignIn,
  validateGetUser
} = require('../middlewares/validation/user');

router.post('/user', validateUserSignUp, userVlidation, createUser);
router.get('/user', validateGetUser, getUser)
router.get('/users', getUsers)
router.post('/sign-in', validateUserSignIn, userVlidation, userSignIn);
router.post('/sign-out', isAuth, signOut);

module.exports = router;
