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
    .withMessage('La contraseña se encuentra vacía!')
    .matches(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,16}$/)
    .withMessage('Ingrese una contraseña válida. Debe poseer: entre 8 y 16 caracteres alfanuméricos, dos letras mayúsculas,un caracter especial, elegir entre: !@#$&*, tres letras minúsculas, dos números'),
  check('role')
    .trim()
    .not()
    .isEmpty()
    .withMessage('El rol (profesor/estudiante) es requerido')
    .isIn(['teacher', 'student'])
    .withMessage('El rol del usuario debe estar entre las opciones: "teacher", "student"'),
];

exports.userVlidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.status(400)
  res.json({ success: false, message: error });
};

exports.validateUserSignIn = [
  check('email').trim().isEmail().withMessage('email / password son requeridos!'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('email / password son requeridos!'),
];

exports.validateGetUser = [
  check('email').trim().isEmail().withMessage('El email no tiene el formato adecuado o se encuentra vacío.')
];
