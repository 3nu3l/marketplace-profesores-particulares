const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const classSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  enrolledStudent: [
    {
      _id: Number,
    },
    {
      rating: Number,
    }
  ],
  ownerId: {
    type: Number,
  },
  comments: [
    {
      type: new mongoose.Schema({
        content: {
          type: String,
          required: true
        },
        studentEmail: {
          type: String,
          required: true
        },
        studentName: {
          type: String,
          required: true
        },
        commentState: {
          type: String,
          required: true
        },
        studentEmail: {
          type: String,
          required: true
        }
      },
        {
          timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
          }
        })
    }
  ]
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

classSchema.plugin(AutoIncrement, { id: 'class_seq', inc_field: '_id' });
module.exports = mongoose.model('Class', classSchema);
