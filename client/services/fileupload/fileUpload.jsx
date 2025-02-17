import api from '../api/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadFile = async (file) => {
    console.log("files to fileUpload",file);
    
  try {
    let data = new FormData();
    data.append('file', file);

    console.log("file data",data);
    

    const response = await api.post('/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      maxBodyLength: Infinity,
    });

    toast.success('File uploaded successfully!');
    return response.data;
  } catch (error) {
    console.error('File upload failed:', error.response?.data || error.message);
    toast.error(error.response?.data?.message || 'File upload failed. Please try again.');
    throw error;
  }
};

export default UploadFile;
