const express = require('express');
const router = express.Router();
const { createFacility, getFacilities, getFacilityById, updateFacility, deleteFacility } = require('../controllers/facilitycontroller');

router.post('/', createFacility);
router.get('/', getFacilities);
router.get('/:id', getFacilityById);
router.put('/:id', updateFacility);
router.delete('/:id', deleteFacility);

module.exports = router;