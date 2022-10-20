const { check, validationResult } = require('express-validator');

exports.validateUserSignUp = [
  check('firstName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('El nombre es requerido'),
  check('lastName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('El apellido es requerido'),
  check('email').normalizeEmail().isEmail().withMessage('Correo electronico inválido.'),
  check('phone')
    .trim()
    .not()
    .isEmpty()
    .withMessage('El telefono es requerido'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is empty!'),
  check('role')
    .trim()
    .not()
    .isEmpty()
    .withMessage('El rol (profesor/estudiante) es requerido'),
];

exports.userVlidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.status(400)
  res.json({ success: false, message: error });
};

exports.validateUserSignIn = [
  check('email').trim().isEmail().withMessage('email / password is required!'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('email / password is required!'),
];

exports.validateGetUser = [
  check('email').trim().isEmail().withMessage('email is required!')
];
