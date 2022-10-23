const Class = require('../models/class');

exports.createClass = async (req, res) => {
  const {
    className,
    subject,
    duration,
    frequency,
    classType,
    cost,
    classState
  } = req.body;
  const _class = await Class({
    className,
    subject,
    duration,
    frequency,
    classType,
    cost,
    classState
  });
  await _class.save();
  res.json({ success: true, _class });
};