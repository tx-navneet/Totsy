const Student = require("../models/studentModel");


const deleteData = async (req, res) => {
  const { id } = req.params;
  console.log("id",id);
  

  try {
    // Find the student by primary key (id)
    const student = await Student.findByPk(id);
    console.log("studentData",student);
    

    // If student is not found
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Delete the student
    await student.destroy();

    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteData;
