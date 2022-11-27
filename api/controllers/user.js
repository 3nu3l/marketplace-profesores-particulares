const jwt = require('jsonwebtoken');
const User = require('../models/user');

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

  res.json({ success: true, user: users });
};

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).json({
      success: false,
      message: 'No se encuentra el usuario en la base de datos',
    });

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

  const userInfo = {
    fullname: user.firstName + ' ' + user.lastName,
    email: user.email,
    role: user.role
  };

  res.json({ success: true, bearerToken, user: userInfo });
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
    res.json({ success: true, message: 'Cierre de sesión exitosa' });
  }
};
