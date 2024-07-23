//authController.js
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const createJWT = require('../utils/createJWT');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exists' });
    }
    const generated_otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = generated_otp;
    await user.save();
    await sendEmail(email, 'Verify your email', `Your OTP code is ${generated_otp}`);
    return res.status(200).json({ otpFlag: true, msg: `OTP has been sent to your email : '${email}' ` });
  } catch (err) {
    return res.status(500).send('Server error');
  }
}

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ msg: 'User already exists' });
    }
    user = new User({ username, email, password });
    await user.save();
    return await sendOTP(req, res);

  } catch (err) {
    res.status(500).send('Server error');
  }
};

const verifyEmail = async (req, res) => {
  const { email, otp, passwordResetFlag } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const isMatch = await bcrypt.compare(toString(otp), user.otp)

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid OTP' });
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).json({ passwordResetFlag, msg: 'Email verified successfully' });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'email is not registered' });
    }

    if (!user.isVerified) {
      return await sendOTP(req, res);
    }

    if (user.googleId && !user.password) {
      return res.status(200).json({ generatePassword: true, msg: `User logged in through google` });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({ msg: 'Incorrect password' });
    }

    const token = createJWT(user);
    return res.status(200).json({ token, msg: "Token sent" });

  } catch (err) {
    return res.status(500).send('Server error');
  }
}

const passwordReset = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'email is not registered' });
    }
    user.password = password;
    await user.save();
    return res.status(200).json({ msg: 'Password updated Successfully' });

  } catch (err) {
    res.status(500).send('Server error');
  }
}

// Route for Google authentication
const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Google callback route
const googleCallback = async (req, res) => {
  passport.authenticate('google', { failureRedirect: '/login' }, async (err, user, info) => {
    if (err) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(401).json({ msg: 'Authentication Failed' });
    }

    const token = createJWT(user);
    res.redirect(`${process.env.AUTH_REDIRECT_URL}?token=${token}`);

  })(req, res);
};

const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const uploadDRDUrl = async (req, res) => {
  const { imageUrl, predictions, maxLabel, user } = req.body;
  const email = user.email;

  if (!imageUrl) {
    return res.status(400).json({ message: 'Image URL is required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newPrediction = {
      imageUrl,
      predictions: {
        mildDR: predictions['Mild DR'],
        moderateDR: predictions['Moderate DR'],
        noDR: predictions['No DR'],
        proliferativeDR: predictions['Proliferative DR'],
        severeDR: predictions['Severe DR']
      },
      maxPrediction: maxLabel,
      uploadedAt: new Date()
    };
    existingUser.DRDPastPredictions.push(newPrediction);
    await existingUser.save();

    res.status(200).json({ message: 'Image and prediction saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { sendOTP, register, verifyEmail, login, passwordReset, googleAuth, googleCallback, getUserProfile, uploadDRDUrl };
