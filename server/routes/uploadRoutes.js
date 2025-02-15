const express = require('express');
const { uploadExcel } = require('../controllers/uploadController');
const upload = require('../middleware/multer');
const { getDataByDate } = require('../controllers/dataController');

const router = express.Router();

router.post('/upload', upload.single('file'), uploadExcel);
router.get("/data/:date", getDataByDate);


module.exports = router;
