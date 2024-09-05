const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.create({ email, password, role });
    res.status(201).json({
      success: true,
      message: "user created successfully",
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
