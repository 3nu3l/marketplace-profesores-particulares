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
  userValidation,
  validateUserSignIn,
  validateGetUser
} = require('../middlewares/validation/user');

router.post('/signUp', cors(), validateUserSignUp, userValidation, createUser);
router.get('/user/:email', cors(), isAuth, validateGetUser, userValidation, getUser)
router.get('/users', cors(), isAuth, userValidation, getUsers)
router.post('/signIn', cors(), userSignIn, validateUserSignIn, userValidation);
router.post('/signOut', cors(), isAuth, signOut);

module.exports = router;
