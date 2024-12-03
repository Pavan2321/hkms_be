const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ResUtil = require('../utils/res');
const sendMail = require('../utils/email/send_mail');
const { encrypt, decrypt } = require('../utils/crypto');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.create(req.body);
    if (user) {
      const templateData = {
        email: email,
        url: `${process.env.WEB_BASE_URL}auth/reset-password?token=${encrypt(`${user._id}|${new Date().getTime()}`)}`
      }
      sendMail(
        {
          to: email,
          from: 'shivamkuyadav320@gmail.com',
          subject: "Reset password",
          templateName: "resetPassword"
        },
        templateData,
      );
    }
    return ResUtil.SUCCESS(req, res, {}, "SUCCESS")
  } catch (err) {
    return ResUtil.VALIDATION_ERROR(req, res, { error: err.message }, "ERROR")
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return ResUtil.VALIDATION_ERROR(req, res, { error: 'Invalid credentials' }, "ERROR");
    }
    console.log(user)

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    return ResUtil.SUCCESS(req, res, { token, ...user.toObject() }, "SUCCESS")
  } catch (err) {
    return ResUtil.VALIDATION_ERROR(req, res, { error: err.message }, "ERROR")
  }
};

exports.reset_password = async (req, res) => {
  const { new_password, token } = req.body;
  try {
    const decryptedToken = decrypt(token);
    const [userId, decryptedTimestamp] = decryptedToken.split("|");
    const currentTime = new Date().getTime();
    const salt = await bcrypt.genSalt(10);
    let newPassword = await bcrypt.hash(new_password, salt);
    if (currentTime - parseInt(decryptedTimestamp) <= 259200000) {
      const response = await User.findByIdAndUpdate({ _id: userId }, { password: newPassword }, { new: true });
      return ResUtil.SUCCESS(req, res, { response }, "Password reset successfuly");
    } else {
      return ResUtil.SERVER_ERROR(req, res, null, "LINK_EXPIRED");
    }
  } catch (error) {
    return ResUtil.SERVER_ERROR(req, res, null, "Server_Error");
  }
};

exports.forget_password = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const templateData = {
        email: email,
        url: `${process.env.WEB_BASE_URL}auth/reset-password?token=${encrypt(`${user._id}|${new Date().getTime()}`)}`
      }
      sendMail(
        {
          to: email,
          from: 'shivamkuyadav320@gmail.com',
          subject: "Reset password",
        },
        templateData,
      );
      return ResUtil.SUCCESS(req, res, {}, "SUCCESS");
    } else {
      return ResUtil.NOT_FOUND(req, res, {}, "User not found!!!");
    }
  } catch (err) {
    return ResUtil.VALIDATION_ERROR(req, res, { error: err.message }, "ERROR")
  }
};
