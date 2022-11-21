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
];

exports.classValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.status(400)
  res.json({ success: false, message: error });
};
