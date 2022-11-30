const jwt = require('jsonwebtoken');
const User = require('../models/user');
const sendMail = require('./email');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    role,
    degreeTeacher,
    experienceTeacher,
    dateOfBirthStudent,
    degreeLevelStudent
  } = req.body;
  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser) {
    res.status(409)
    return res.json({
      success: false,
      message: 'Este email ya existe en la plataforma. Si no recuerda la contraseña la puede recuperar',
    });
  }
  const user = await User({
    firstName,
    lastName,
    email,
    phone,
    password,
    role,
    degreeTeacher,
    experienceTeacher,
    dateOfBirthStudent,
    degreeLevelStudent,
  });
  await user.save();
  res.json({ success: true, user });
};

exports.getUser = async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentra el usuario ' + email + ' en la base de datos',
    });
  }
  else {
    return res.status(200).json({ success: true, user: user });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find({});

  if (users.length === 0)
    return res.status(404).json({
      success: false,
      message: 'No se encuentran usuarios en la base de datos',
    });

  users.password = "No Visible";
  res.json({ success: true, user: users });
};

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentra el usuario en la base de datos',
    });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.json({
      success: false,
      message: 'La contraseña es invalida',
    });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1800s',
  });

  const bearerToken = "Bearer " + token

  let oldTokens = user.tokens || [];

  if (oldTokens.length) {
    oldTokens = oldTokens.filter(t => {
      const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
      if (timeDiff < 86400) {
        return t;
      }
    });
  }

  await User.findByIdAndUpdate(user._id, {
    tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  });

  user.password = "No Visible";
  res.status(200).json({ success: true, bearerToken, user: user });
};

exports.signOut = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Autorización fallida!' });
    }

    const tokens = req.user.tokens;

    const newTokens = tokens.filter(t => t.token !== token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    return res.status(200).json({ success: true, message: 'Cierre de sesión exitosa' });
  }
};

exports.requestPasswordReset = async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentra el usuario en la base de datos.',
    });
  }
  else {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_RESET_SECRET_KEY, {
      expiresIn: '1800s',
    });

    const bearerToken = "Bearer " + token

    let oldTokens = user.tokens || [];

    if (oldTokens.length) {
      oldTokens = oldTokens.filter(t => {
        const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
        if (timeDiff < 86400) {
          return t;
        }
      });
    }
    const text="Click aquí para cambiar contraseña: " + process.env.URL_DASHBOARD + "/passwordRecovery/?recoveryToken=" + token
    sendMail.send(email, "Solicitud de cambio de contraseña", text)
    console.log("e-mail enviado para recuperar password del usuario " + email + ": " + text)
    return res.status(200).json({ success: true, message: "Se envía email a " + email + " con link para el cambio de contraseña." });
  }
};

exports.passwordReset = async (req, res) => {
  const { email, newPassword } = req.body;
  const _user = await User.findOne({ email });
  if (_user.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentra el usuario en la base de datos.',
    });
  }
  const newPasswordHash = await bcrypt.hash(newPassword, 8);
  const user = await User.findByIdAndUpdate(_user._id, { $set: { "password": newPasswordHash } });
  if (user.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No se pudo modificar la contraseña del usuario ' + user.email,
    });
  }
  else {
    return res.status(200).json({ success: true, message: "Contraseña modificada del usuario " + _user.email });
  }
};