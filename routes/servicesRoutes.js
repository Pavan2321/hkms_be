const express = require('express');
const router = express.Router();
const { createServices, getServices, getServiceById, updateService, deleteService } = require('../controllers/servicesController');

router.post('/', createServices);
router.get('/', getServices);
router.get('/:id', getServiceById);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router;