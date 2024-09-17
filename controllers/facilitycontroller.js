const Facility = require('../models/Facility');
const ResUtil = require('../utils/res');

exports.createFacility = async (req, res) => {
    try {
        const newFacility = new Facility(req.body);
        const response = await newFacility.save();
        ResUtil.SUCCESS(req, res, { response }, "SUCCESS");
    } catch (error) {
        ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR_ON_CREATE_FACILITY");
    }
};

exports.getFacilities = async (req, res) => {
    try {
        const data = await Facility.find();
        ResUtil.SUCCESS(req, res, { data }, "SUCCESS");
    } catch (error) {
        ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR");
    }
};

exports.getFacilityById = async (req, res) => {
    try {
        const facility = await Facility.findById(req.params.id);
        if (!facility) {
            ResUtil.NOT_FOUND(req, res, { message: "Facility not found" }, 'ERROR');
        }
        ResUtil.SUCCESS(req, res, { facility }, "SUCCESS");
    } catch (error) {
        ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR");
    }
};

exports.updateFacility = async (req, res) => {
    try {
        const facilityData = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!facilityData) {
            ResUtil.NOT_FOUND(res, req, { message: "Facility not found" }, 'ERROR');
        };
        ResUtil.SUCCESS(req, res, { facilityData }, 'SUCCESS');
    } catch (error) {
        ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR");
    }
};

exports.deleteFacility = async (req, res) => {
    try {
        const data = await Facility.findByIdAndDelete(req.params.id);
        if (!data) {
            ResUtil.VALIDATION_ERROR(res, req, { message: "Facility not found" }, 'ERROR');
        }
        ResUtil.SUCCESS(req, res, {}, 'SUCCESS');
    } catch (error) {
        ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR");
    }
};