import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/api';

const UploadFile = async (file) => {
    try {
        // Create FormData
        let data = new FormData();
        data.append('file', file);

        // Axios configuration
        const response = await axios.post(`http://localhost:4040/api/upload`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            maxBodyLength: Infinity,
        });

        // Handle response
        console.log(JSON.stringify(response.data));
        toast.success('File uploaded successfully!');
        return response.data;
    } catch (error) {
        // Error handling
        console.error('File upload failed:', error.response?.data || error.message);
        toast.error(error.response?.data?.message || 'File upload failed. Please try again.');
        throw error; // Optionally re-throw the error for further handling
    }
};

export default UploadFile;
