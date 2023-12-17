const express = require('express');
const router = express.Router();
const pendaftaranController = require('../controllers/pendaftaranController');

router.get('/pendaftaran', pendaftaranController.getData);
router.post('/pendaftaran/store', pendaftaranController.storeData);
router.get('/pendaftaran/:id', pendaftaranController.getDataById);
router.put('/pendaftaran/:id/update', pendaftaranController.updateData);
router.delete('/pendaftaran/:id/delete', pendaftaranController.deleteData);

module.exports = router;