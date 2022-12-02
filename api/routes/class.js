const express = require('express');
var cors = require('cors')

const router = express.Router();
const {
  createClass,
  getClass,
  getClassByName,
  getClasses,
  updateClass,
  addComment,
  getComments,
  changeCommentState,
  getClassByOwner,
  deleteClass,
  searchByAnyFilter
} = require('../controllers/class');
const { isAuth } = require('../middlewares/config/auth');
const {
  validateRegisterClass,
  classVlidation,
  classValidationById,
  classValidationByClass,
  classValidationByNameAndSubject,
  commentValidation,
  classValidationByOwner
} = require('../middlewares/validation/class');

router.post('/class', cors(), isAuth, classVlidation, validateRegisterClass, createClass);
router.get('/class/:className/:subject', cors(), isAuth, classValidationByNameAndSubject, classVlidation, getClass);
router.get('/className/:className', cors(), isAuth, classValidationByClass, classVlidation, getClassByName);
router.get('/classOwner/:ownerId', cors(), isAuth, classValidationByOwner, classVlidation, getClassByOwner);
router.get('/classes', cors(), isAuth, classVlidation, getClasses);
router.get('/classes/search/:filter', cors(), isAuth, classVlidation, searchByAnyFilter);
router.put('/classId/:_id', cors(), isAuth, classVlidation, classValidationById, updateClass);
router.put('/comments/addComment/:_id', cors(), isAuth, classVlidation, classValidationById, commentValidation, addComment);
router.get('/comments/:className/:subject', cors(), isAuth, classVlidation, classValidationByNameAndSubject, getComments);
router.put('/comments/:_id', cors(), isAuth, classVlidation, classValidationByNameAndSubject, changeCommentState);
router.delete('/deleteClass/:_id', cors(), isAuth, classVlidation, classValidationById, deleteClass);

module.exports = router;
