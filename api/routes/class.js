const express = require('express');
var cors = require('cors')

const router = express.Router();
const {
  createClass,
  getClass,
  getClassByName,
  getClasses,
  updateClass,
  addComment
} = require('../controllers/class');
const { isAuth } = require('../middlewares/config/auth');
const {
  validateRegisterClass,
  classVlidation,
  classValidationById,
  classValidationByClass,
  classValidationByNameAndSubject,
  commentValidation,
  validateUpdateClass
} = require('../middlewares/validation/class');

router.post('/class', cors(), isAuth, classVlidation, validateRegisterClass, createClass);
router.get('/class/:className/:subject', cors(), isAuth, classValidationByNameAndSubject, classVlidation, getClass);
router.get('/className/:className', cors(), isAuth, classValidationByClass, classVlidation, getClassByName);
router.get('/classes', cors(), isAuth, classVlidation, getClasses);
router.put('/classId/:_id', cors(), isAuth, classVlidation, classValidationById, updateClass);
router.put('/class/addComment/:_id', cors(), isAuth, classVlidation, classValidationById, commentValidation, addComment);

module.exports = router;
