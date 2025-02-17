import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, LinearProgress, Card, CardContent, Typography, Grid } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';

import UploadFile from '../../../services/fileupload/fileUpload';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

  
        if (parsedData.length > 0) {
          setHeaders(Object.keys(parsedData[0]));
          
        }
       
      };

      const uploadedFile = {
        name: file.name,
        size: file.size,
        progress: Math.floor(Math.random() * 100) + 1,
        type: file.name.split('.').pop().toUpperCase(),
      };
      
      
     
      setFiles((prevFiles) => [...prevFiles, uploadedFile]);
    });
  }, []);
  console.log("state inside file",files)
  UploadFile(files)

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setExcelData([]);
    setHeaders([]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept:
      '.xlsx, .xls, .xlsb, .xltx, .xlsm, .csv, .xml, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
  });

  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-lg"
    >
      <h2 className="mb-4 text-xl font-bold text-gray-700">
        <span className="text-blue-600">UPLOAD</span> EXCEL FILES
      </h2>
      <motion.div
        {...getRootProps()}
        className="flex cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 hover:bg-gray-100"
        whileHover={{ scale: 1.02 }}
      >
        <input {...getInputProps()} />
        <CloudUpload className="text-5xl text-blue-500" />
        <p className="mt-2 text-gray-500">Drag And Drop Your Excel File Here</p>
        <span className="text-gray-400">OR</span>
        <Button variant="contained" color="primary" className="mt-4">
          Browse
        </Button>
      </motion.div>
      <div className="mt-6">
        {files.map((file, index) => (
          <motion.div
            key={index}
            className="mb-2 flex items-center justify-between rounded-lg bg-gray-100 p-3 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-4">
              <div className="rounded-md bg-blue-500 px-3 py-1 text-sm font-bold text-white">
                {file.type}
              </div>
              <div>
                <p className="font-medium text-gray-700">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <div className="w-40">
              <LinearProgress variant="determinate" value={file.progress} />
            </div>
            <button
              onClick={() => removeFile(index)}
              className="cursor-pointer text-red-500 hover:text-red-700"
            >
              ✖
            </button>
          </motion.div>
        ))}
      </div>
      {excelData.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <h3 className="text-lg font-semibold">Parsed Excel Data:</h3>
          <Grid container spacing={2} className="mt-4">
            {excelData.map((row, rowIndex) => (
              <Grid item xs={12} sm={6} key={rowIndex}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: rowIndex * 0.1 }}
                >
                  <Card className="rounded-lg bg-gray-100 p-4 shadow-md">
                    <CardContent>
                      {headers.slice(0, 4).map((header, index) => (
                        <Typography key={index} variant="body1" className="text-gray-700">
                          <strong>{header}:</strong> {row[header]}
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FileUpload;
