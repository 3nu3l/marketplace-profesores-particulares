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
  userValidation,
  validateUserSignIn,
  validateGetUser
} = require('../middlewares/validation/user');

router.post('/signUp', cors(), validateUserSignUp, userValidation, createUser);
router.get('/user/:email', cors(), isAuth, validateGetUser, userValidation, getUser)
router.get('/users', cors(), isAuth, userValidation, getUsers)
router.post('/signIn', cors(), userSignIn, validateUserSignIn, userValidation);
router.post('/signOut', cors(), isAuth, signOut);
router.post('/reset-password', cors(), isAuthResetPassword, passwordReset)
router.get('/request-reset-password/:email', cors(), requestPasswordReset)

module.exports = router;
