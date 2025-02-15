const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const moment = require("moment");
const Student = require("../models/studentModel");

const uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.join(__dirname, "../uploads", req.file.filename);
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    let sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { raw: false });

    if (!sheetData || sheetData.length === 0) {
      return res.status(400).json({ error: "Uploaded file is empty or invalid" });
    }

    let insertedRecords = [];
    let skippedRecords = [];

    for (let row of sheetData) {
      let {
        Date: date,
        Category: category,
        Activity: activity,
        Objective: objective,
        Material: material,
        Example: example,
      } = row;

      if (!date || !category) {
        console.log(`Skipping row due to missing date or category: ${JSON.stringify(row)}`);
        skippedRecords.push({ date, category, reason: "Missing date or category" });
        continue;
      }

      // Format date properly
      let formattedDate = moment(date, ["MM/DD/YY", "M/D/YY", "MM-DD-YYYY", "YYYY-MM-DD"], true);
      if (!formattedDate.isValid()) {
        console.log(`Skipping row due to invalid date: ${date}`);
        skippedRecords.push({ date, category, reason: "Invalid date format" });
        continue;
      }
      formattedDate = formattedDate.format("YYYY-MM-DD");

      // Convert category properly
      let formattedCategory = category.toLowerCase().trim();

      // **Check if (date, category) combination already exists**
      const existingEntry = await Student.findOne({
        where: { date: formattedDate, category: formattedCategory },
      });

      if (existingEntry) {
        console.log(`Skipping duplicate record: Date = ${formattedDate}, Category = ${formattedCategory}`);
        skippedRecords.push({
          date: formattedDate,
          category: formattedCategory,
          reason: "Duplicate data, provide different data",
        });
      } else {
        const newStudent = await Student.create({
          date: formattedDate,
          category: formattedCategory,
          activity: activity,
          objective: objective,
          material: material,
          example: example,
        });
        insertedRecords.push(newStudent);
        console.log(`Inserted: Date = ${formattedDate}, Category = ${formattedCategory}`);
      }
    }

    // **Generate a dynamic response message**
    let message = "File uploaded and data processed successfully.";
    if (skippedRecords.length > 0) {
      message = `File uploaded successfully, but some duplicate data was found. Please provide different data.`;
    }

    res.status(200).json({
      message: message,
      insertedRecords: insertedRecords.length,
      skippedRecords: skippedRecords,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadExcel };
