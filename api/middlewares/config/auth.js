const jwt = require('jsonwebtoken');
const User = require('../../models/user');

exports.isAuth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (token == null) return res.sendStatus(401).json({ success: false, message: 'Token inválido' })

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decode.userId);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Acceso no autorizado!' });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ success: false, message: 'Acceso no autorizado!' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Sesión expirada, ingrese nuevamente',
        });
      }
      else
        return res.status(500).json({ success: false, message: 'Internal server error!' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Acceso no autorizado!' });
  }
};

exports.isAuthResetPassword = async (req, res, next) => {
  if (req.headers && req.headers.recoveryToken) {
    const token = req.headers.recoveryToken.split(' ')[1];
    if (token == null) return res.sendStatus(401).json({ success: false, message: 'Token inválido' })

    try {
      const decode = jwt.verify(token, process.env.JWT_RESET_SECRET_KEY);
      const user = await User.findById(decode.userId);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Acceso no autorizado!' });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ success: false, message: 'Acceso no autorizado!' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token expirado, solicite un nuevo cambio de contraseña',
        });
      }
      else
        return res.status(500).json({ success: false, message: 'Internal server error!' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Acceso no autorizado!' });
  }
};

