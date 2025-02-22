const express = require('express');
const { uploadExcel } = require('../controllers/uploadController');
const upload = require('../middleware/multer');
const { getDataByDate } = require('../controllers/dataController');
const getAllData = require('../controllers/GetAllDataController');
const deleteData = require('../controllers/DeleteDataController');

const router = express.Router();

router.post('/upload', upload.single('file'), uploadExcel);
router.get("/data/:date", getDataByDate);
router.get("/getalldata/students",getAllData)
router.delete("/deletedata/:id",deleteData)


module.exports = router;
