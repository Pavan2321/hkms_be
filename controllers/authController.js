const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ResUtil = require('../utils/res');

exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    await User.create({ email, password, role });
    return ResUtil.SUCCESS(req, res, { }, "SUCCESS")
  } catch (err) {
    return ResUtil.VALIDATION_ERROR(req, res, { error: err.message }, "ERROR")
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return ResUtil.VALIDATION_ERROR(req,res,{ error: 'Invalid credentials' }, "ERROR");
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    return ResUtil.SUCCESS(req, res, { token }, "SUCCESS")
  } catch (err) {
    return ResUtil.VALIDATION_ERROR(req, res, { error: err.message }, "ERROR")
  }
};
