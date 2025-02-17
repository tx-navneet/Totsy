const Student = require('../models/studentModel');

const getAllData = async (req, res) => {
  try {
    const records = await Student.findAll(); 

    if (records.length > 0) {
      res.status(200).send({ message: "Data fetched successfully", data: records });
    } else {
      res.status(404).send({ message: "No data found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ message: "Server error, please try again later" });
  }
};


module.exports = getAllData