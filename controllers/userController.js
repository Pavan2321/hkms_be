const User = require('../models/User');
const ResUtil = require('../utils/res');

exports.getUsers = async (req, res) => {
    try {
        const usersData = await User.find({ role: { $ne: 'admin' }});
        ResUtil.SUCCESS(req, res, { usersData }, "SUCCESS");
    } catch (error) {
        ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR");
    };
};

exports.getUserById = async (req, res) => {
    try {
        const userData = await User.findById(req.params.id);
        if (!userData) {
            return ResUtil.NOT_FOUND(req, res, { message: 'User not found' }, 'ERROR')
        }
        ResUtil.SUCCESS(req, res, { userData }, "SUCCESS")
    } catch (error) {
        ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR")
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userData = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!userData) {
            return ResUtil.NOT_FOUND(req, res, { message: 'User not found' }, 'ERROR')
        }
        ResUtil.SUCCESS(req, res, { userData }, "SUCCESS")
    } catch (error) {
        ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR")
    }
};

exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return ResUtil.VALIDATION_ERROR(req, res, { message: 'User not found' }, 'ERROR')
      }
      ResUtil.SUCCESS(req, res, {}, "SUCCESS")
    } catch (error) {
      ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR")
    }
  };