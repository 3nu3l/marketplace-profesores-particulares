const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
  _id: {
    type: Number
  },
  className: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  classType: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  classState: {
    type: String,
    required: true,
  },
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

userSchema.plugin(AutoIncrement, { id: 'class_seq', inc_field: '_id' });
module.exports = mongoose.model('Class', userSchema);
