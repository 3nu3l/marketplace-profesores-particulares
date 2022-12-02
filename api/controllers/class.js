const Class = require('../models/class');
const sendMail = require('./email');

function diacriticSensitiveRegex(string = '') {
  return string.replace(/a/g, '[a,á,à,ä,â]')
    .replace(/e/g, '[e,é,ë,è]')
    .replace(/i/g, '[i,í,ï,ì]')
    .replace(/o/g, '[o,ó,ö,ò]')
    .replace(/u/g, '[u,ü,ú,ù]');
}

exports.createClass = async (req, res) => {
  const {
    className,
    subject,
    duration,
    frequency,
    classType,
    cost,
    classState,
    ownerId,
    description,
  } = req.body;
  const _class = await Class({
    className,
    subject,
    duration,
    frequency,
    classType,
    cost,
    classState,
    ownerId,
    description
  });
  await _class.save();
  res.status(200).json({ success: true, _class });
};

exports.getClass = async (req, res) => {
  const classParams = req.params;
  const _class = await Class.find(classParams);

  if (_class.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentra la clase con nombre ' + classParams.className + ' y la materia ' + classParams.subject + ' en la base de datos',
    });
  }
  else {
    return res.status(200).json({ success: true, class: _class });
  }
};

exports.getClassByOwner = async (req, res) => {
  const ownerId = req.params.ownerId
  const _class = await Class.find({ ownerId });

  if (_class.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentran clases creadas por el usuario ' + ownerId
    });
  }
  else {
    return res.status(200).json({ success: true, class: _class });
  }
};

exports.getClassByName = async (req, res) => {
  const className = req.params.className;
  const _class = await Class.findOne({ className });

  if (!_class) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentra la clase con nombre ' + className + ' en la base de datos',
    });
  }
  else {
    return res.status(200).json({ success: true, class: _class });
  }
};

exports.getClasses = async (req, res) => {
  const _class = await Class.find({});

  if (_class.length === 0)
    return res.status(404).json({
      success: false,
      message: 'No se encuentran clases en la base de datos',
    });
  res.status(200).json({ success: true, class: _class });
};

exports.updateClass = async (req, res) => {
  const id = req.params._id;
  const paramClass = req.body;

  Class.findByIdAndUpdate(id, paramClass, function (err, result) {
    if (err) {
      return res.status(404).json({
        success: false,
        message: 'No se encuentra la clase con id ' + id + ' en la base de datos',
      });
    }
    else {
      return res.status(200).json({ success: true, message: 'Clase con id ' + id + ' modificada con éxito' });
    }
  });
};

exports.addComment = async (req, res) => {
  const id = req.params._id;
  var paramComment = [{
    content: req.body.content,
    studentName: req.body.studentName,
    commentState: req.body.commentState
  }];

  Class.findByIdAndUpdate(id, { $push: { comments: paramComment } }, function (err, result) {
    if (err) {
      return res.status(404).json({
        success: false,
        message: 'No se encuentra la clase con id ' + id + ' en la base de datos',
      });
    }
    else {
      return res.status(200).json({ success: true, message: 'Se agregó un comentario en la clase con id ' + id });
    }
  });
};

exports.getComments = async (req, res) => {
  const _id = req.params._id;
  const _class = await Class.findOne({ _id }).select('comments');

  if (!_class) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentra la clase con ID ' + _id,
    });
  }
  else {
    return res.status(200).json({ success: true, class: _class });
  }
}

exports.changeCommentState = async (req, res) => {
  const _id = req.params._id;
  const studentName = req.body.studentName;
  const commentState = req.body.commentState;
  const studentEmail = req.body.studentEmail;
  const descriptionState = req.body.descriptionState;

  const _class = await Class.findOneAndUpdate({ _id, "comments.studentName": studentName }, { $set: { "comments.$.commentState": commentState } });

  if (commentState === "Rechazado") {
    const subject = "Comentario rechazado en la clase con ID " + _id
    sendMail.send(studentEmail, subject, "Motivo del Rechazo: " + descriptionState)
    console.log("e-mail enviado al usuario " + studentEmail + " con el subject " + subject + " y descripción: " + descriptionState)
  }

  if (!_class) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentra la clase con ID ' + _id + ' o un comentario del estudiante ' + studentName
    });
  }
  else {
    return res.status(200).json({ success: true, class: _class });
  }
}

exports.deleteClass = async (req, res) => {
  const idClass = req.params._id;
  const _class = await Class.findByIdAndDelete(idClass, function (err, msg) {
    if (!err) {
      return res.status(202).json({ success: true, message: msg });
    }
    else {
      return res.status(404).json({
        success: false,
        message: err,
      });
    }
  });
}

exports.searchByAnyFilter = async (req, res) => {
  const criteria = new RegExp(diacriticSensitiveRegex(req.params.filter), "i")
  const _class = await Class.find({
    "$or": [
      { "className": { $regex: criteria } },
      { "subject": { $regex: criteria } },
      { "description": { $regex: criteria } },
      { "frequency": { $regex: criteria } }
    ]
  });

  if (!_class) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentran datos con ese criterio de búsqueda',
    });
  }
  else {
    return res.status(200).json({ success: true, class: _class });
  }
}

exports.setEnrollments = async (req, res) => {
  const id = req.params._id;

  var enrollments = {
    'enrolledStudent': {
      _id: req.body.studentId
    }
  };

  Class.update({ _id: id }, { $push: enrollments }, { upsert: true }, function (err, result) {
    if (!err && result) {
      return res.status(200).json({ success: true, message: "Estudiante agregado" });
    }
    else {
      return res.status(404).json({
        success: false,
        message: "La clase " + id + " no existe."
      });
    }
  });
}

exports.getEnrollments = async (req, res) => {
  const id = req.params._id;

  const _class = await Class.find({ "enrolledStudent._id": id },
    {
      "_id": 1,
      "className": 1,
      "subject": 1
    });

  if (_class.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentran inscripciones activas',
    });
  }
  else {
    return res.status(200).json({ success: true, classes: _class });
  }
}