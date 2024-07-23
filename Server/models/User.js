const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const DRDPastPredictionsSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  predictions: {
    mildDR: { type: Number, required: true },
    moderateDR: { type: Number, required: true },
    noDR: { type: Number, required: true },
    proliferativeDR: { type: Number, required: true },
    severeDR: { type: Number, required: true },
  },
  maxPrediction: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  otp: { type: String },
  isVerified: { type: Boolean, default: false },
  DRDPastPredictions: [DRDPastPredictionsSchema],
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  if (this.isModified('otp')) {
    const salt = await bcrypt.genSalt(10);
    this.otp = await bcrypt.hash(toString(this.otp), salt);
  }
  next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
