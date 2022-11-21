const express = require('express');

const router = express.Router();
const {
  createClass
} = require('../controllers/class');
const { isAuth } = require('../middlewares/config/auth');
const {
  validateRegisterClass,
  classValidation
} = require('../middlewares/validation/class');

router.post('/class', validateRegisterClass, classValidation, createClass);

module.exports = router;
