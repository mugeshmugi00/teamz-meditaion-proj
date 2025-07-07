const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  terms: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Pre-save middleware to validate and hash password
userSchema.pre('save', async function(next) {
  if (this.password !== this.confirmPassword) {
    return next(new Error('Passwords do not match'));
  }
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
  }
  next();
});

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.confirmPassword;
  return user;
};

module.exports = mongoose.model('User', userSchema);