const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Sign up a new user
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Login an existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
