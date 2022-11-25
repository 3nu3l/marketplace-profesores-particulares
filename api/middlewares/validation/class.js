const { check, validationResult } = require('express-validator');

exports.validateRegisterClass = [
  check('className')
    .trim()
    .not()
    .isEmpty()
    .withMessage('El nombre de la clase es requerida'),
  check('subject')
    .trim()
    .not()
    .isEmpty()
    .withMessage('El nombre de la materia es requerida'),
  check('duration')
    .trim()
    .not()
    .isEmpty()
    .withMessage('La duración de la clase es requerida'),
  check('frequency')
    .trim()
    .not()
    .isEmpty()
    .withMessage('La frecuencia de la clase es requerido')
    .isIn(['Única', 'Semanal', 'Mensual'])
    .withMessage('La frecuencia de la clase debe estar entre las opciones: "Única", "Semanal", "Mensual'),
  check('classType')
    .trim()
    .not()
    .isEmpty()
    .withMessage('El tipo de la clase es requerido')
    .isIn(['Individual', 'Grupal'])
    .withMessage('El tipo de la clase debe estar entre las opciones: "Individual", "Grupal"'),
  check('cost')
    .trim()
    .not()
    .isEmpty()
    .withMessage('El cost de la clase es requerido'),
  check('classState')
    .trim()
    .not()
    .isEmpty()
    .withMessage('El estado de la clase es requerido')
    .isIn(['Publicada', 'Despublicada', 'Eliminada'])
    .withMessage('El estado de la clase debe estar entre las opciones: "Publicada", "Despublicada", "Eliminada"'),
  check('rating', 'La calificación debe estar entre 0 y 5')
    .isFloat({ min: 0, max: 5 })
];

exports.classVlidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.status(400).json({ success: false, message: error });
};

exports.classValidationByClass = [
  check('className').trim().not().isEmpty().withMessage('El nombre de la clase es requerida'),
];

exports.classValidationByNameAndSubject = [
  check('className').trim().not().isEmpty().withMessage('El nombre de la clase es requerida'),
  check('subject').trim().not().isEmpty().withMessage('El nombre de la materia es requerida'),
];

exports.classValidationById = [
  check('_id').trim().not().isEmpty().withMessage('El ID de la clase es requerida'),
];

exports.commentValidation = [
  check('content')
    .trim()
    .not()
    .isEmpty()
    .withMessage('El cuerpo del comentario es requerido'),
  check('studentName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('El nombre de el estudiante es requerido'),
  check('commentState')
    .trim()
    .not()
    .isEmpty()
    .withMessage('El estado del comentario es requerido')
    .isIn(['Pendiente', 'Aprobado', 'Rechazado'])
    .withMessage('El estado del comentario debe estar entre las opciones: "Pendiente", "Aprobado", "Rechazado"'),
];

exports.validateUpdateClass = [
  check('frequency')
    .trim()
    .isIn(['Única', 'Semanal', 'Mensual'])
    .withMessage('La frecuencia de la clase debe estar entre las opciones: "Única", "Semanal", "Mensual'),
  check('classType')
    .trim()
    .isIn(['Individual', 'Grupal'])
    .withMessage('El tipo de la clase debe estar entre las opciones: "Individual", "Grupal"'),
  check('classState')
    .trim()
    .isIn(['Publicada', 'Despublicada', 'Eliminada'])
    .withMessage('El estado de la clase debe estar entre las opciones: "Publicada", "Despublicada", "Eliminada"'),
  check('rating')
    .isFloat({ min: 0, max: 5 })
    .withMessage('La calificación debe estar entre 0 y 5'),
];