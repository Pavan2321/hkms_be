const Services = require('../models/Services');
const ResUtil = require('../utils/res');

exports.createServices = async (req, res) => {
    try {
        const newService = new Services(req.body);
        const response = await newService.save();
        ResUtil.SUCCESS(req, res, { response }, "SUCCESS");
    } catch (error) {
        ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR_ON_CREATE_SERVICE");
    }
};

exports.getServices = async (req, res) => {
    try {
        const data = await Services.find();
        ResUtil.SUCCESS(req, res, { data }, "SUCCESS");
    } catch (error) {
        ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR");
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const serviceData = await Services.findOne({ id: req.params.id });
        if (!serviceData) {
            ResUtil.NOT_FOUND(req, res, { message: "Service not found" }, 'ERROR');
        }
        ResUtil.SUCCESS(req, res, { serviceData }, "SUCCESS");
    } catch (error) {
        ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR");
    }
};

exports.updateService = async (req, res) => {
    try {
        const serviceData = await Services.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!serviceData) {
            ResUtil.NOT_FOUND(res, req, { message: "Service not found" }, 'ERROR');
        };
        ResUtil.SUCCESS(req, res, { serviceData }, 'SUCCESS');
    } catch (error) {
        ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR");
    }
};

exports.deleteService = async (req, res) => {
    try {
        const data = await Services.findOneAndDelete({ id: req.params.id });
        if (!data) {
            ResUtil.VALIDATION_ERROR(res, req, { message: "Service not found" }, 'ERROR');
        }
        ResUtil.SUCCESS(req, res, {}, 'SUCCESS');
    } catch (error) {
        ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR");
    }
};