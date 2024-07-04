const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
  us_id: {
    type: Number,
    unique: true,
  },
  us_name: {
    type: String,
    required: true,
  },
  us_password: {
    type: String,
    required: true,
  },
  us_email: {
    type: String,
    required: true,
    unique: true,
  },
  us_phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  us_address: {
    type: String,
    required: true,
  },
  us_created_at: {
    type: Date,
    default: Date.now,
  },
  us_updated_at: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'Users' });

userSchema.plugin(AutoIncrement, { inc_field: 'us_id' });

userSchema.pre('save', async function(next) {
  if (!this.isModified('us_password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.us_password = await bcrypt.hash(this.us_password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.us_password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
