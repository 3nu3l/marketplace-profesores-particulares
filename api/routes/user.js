const express = require('express');
var cors = require('cors')

const router = express.Router();
const {
  createUser,
  getUser,
  getUsers,
  userSignIn,
  signOut,
  passwordReset,
  requestPasswordReset
} = require('../controllers/user');
const { isAuth, isAuthResetPassword } = require('../middlewares/config/auth');
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
router.post('/reset-password', cors(), isAuthResetPassword, passwordReset)
router.get('/request-reset-password/:email', cors(), requestPasswordReset)

module.exports = router;
