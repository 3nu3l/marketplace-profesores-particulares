const Class = require('../models/class');

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
  const classParams = req.params;
  const _class = await Class.find(classParams).select('comments');

  if (_class.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentra la clase con nombre ' + classParams.className + ' y la materia ' + classParams.subject + ' en la base de datos',
    });
  }
  else {
    return res.status(200).json({ success: true, class: _class });
  }
}

exports.changeStateComment = async (req, res) => {
  const classParams = req.params;
  const studentName = req.body.studentName;
  const commentState = req.body.commentState;
  const comments = {
    "studentName": studentName,
    "commentState": commentState
  }

  const _class = await Class.findOneAndUpdate(classParams, { $set: { "comments.$.commentState": comments.commentState } });

  if (_class.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No se encuentra la clase con nombre ' + classParams.className + ' y la materia ' + classParams.subject + ' en la base de datos',
    });
  }
  else {
    return res.status(200).json({ success: true, class: _class });
  }
}
