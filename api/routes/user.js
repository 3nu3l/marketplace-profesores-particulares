const express = require('express');
var cors = require('cors')

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

router.post('/signUp', cors(), validateUserSignUp, userVlidation, createUser);
router.get('/user/:email', cors(), isAuth, validateGetUser, userVlidation, getUser)
router.get('/users', cors(), isAuth, userVlidation, getUsers)
router.post('/signIn', cors(), userSignIn, validateUserSignIn, userVlidation);
router.post('/signOut', cors(), isAuth, signOut);

module.exports = router;
