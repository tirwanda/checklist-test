const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.post('/checklist/attribute', apiController.addAttribute);
router.post('/checklist/link', apiController.addLink);
router.post('/checklist', apiController.addData);

router.get('/checklist/:id', apiController.getDataById);
router.get('/checklist', apiController.getData);

router.put('/checklist/:id', apiController.updateDataById);

router.delete('/checklist/:id', apiController.deleteDataById);

module.exports = router;
