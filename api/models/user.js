const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  _id: {
    type: Number
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  degreeTeacher: {
    type: String,
  },
  experienceTeacher: {
    type: String,
  },
  dateOfBirthStudent: {
    type: String,
  },
  degreeLevelStudent: {
    type: String,
  },
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

userSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error('Email inválido');
  try {
    const user = await this.findOne({ email });
    if (user) return false;

    return true;
  } catch (error) {
    console.log('Error en isThisEmailInUse method', error.message);
    return false;
  }
};

userSchema.plugin(AutoIncrement, { id: 'user_seq', inc_field: '_id' });
module.exports = mongoose.model('User', userSchema);
