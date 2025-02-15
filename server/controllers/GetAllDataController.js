const Student = require("../models/studentModel");

const getAllData = async (req, res) => {
  try {
    

    

    const data = await Student.findAll({
      where: { date: date },
      attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude timestamps
    });

    if (data.length === 0) {
      return res.status(404).json({ message: "No records found for the given date" });
    }

    res.status(200).json({
      message: `Data retrieved successfully for ${date}`,
      data: data,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllData };
