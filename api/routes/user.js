const express = require('express');

const router = express.Router();
const {
  createUser,
  getUser,
  getUsers,
  userSignIn,
  signOut,
} = require('../controllers/user');
const { isAuth } = require('../middlewares/config/auth');
const {
  validateUserSignUp,
  userVlidation,
  validateUserSignIn,
  validateGetUser
} = require('../middlewares/validation/user');

router.post('/user', validateUserSignUp, userVlidation, createUser);
router.get('/user/:email', isAuth, validateGetUser, userVlidation, getUser)
router.get('/users', isAuth, userVlidation, getUsers)
router.post('/signIn', userSignIn, validateUserSignIn, userVlidation);
router.post('/signOut', isAuth, signOut);

module.exports = router;
