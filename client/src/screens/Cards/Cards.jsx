/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CardActions, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tab, Tabs } from '@mui/material';
import { motion } from 'framer-motion';
import { FileCopy } from '@mui/icons-material';

const Cards = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(''); // Track selected category
  const [categories] = useState(['sr.kg', 'nursery', 'jr.kg', 'playgroup']); // Predefined categories

  // Fetch all data initially
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/api/getalldata/students');
      setAllData(response.data.data);
      setData(response.data.data); // Initially show all data
    } catch (error) {
      console.log('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data based on selected date
  const fetchDataByDate = async (date) => {
    console.log("dates ",date);
    
    setLoading(true);
    try {
      const response = await axios.get(`/api/api/data/${date}`);
      setData(response.data.data);
    } catch (error) {
      console.log('Error fetching data by date: ', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle date change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    if (event.target.value) {
      fetchDataByDate(event.target.value); // Fetch data by selected date
    } else {
      filterDataByCategory(selectedCategory);
    }
  };

  // Handle category selection from the tabs
  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
    const filteredData = allData.filter((item) => item.category === newValue);
    setData(filteredData); // Show data for the selected category
  };

  // Function to handle copy to clipboard
  const handleCopyToClipboard = (cardDetails) => {
    const textToCopy = `
      Activity: ${cardDetails.activity} - ${cardDetails.category}
      Objective: ${cardDetails.objective}
      Materials: ${cardDetails.material}
      Example: ${cardDetails.example}
      Activity Date: ${new Date(cardDetails.date).toLocaleDateString()}
    `;
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert('Card details copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy: ', error);
      });
  };

  // Open dialog with card details
  const handleOpenDialog = (card) => {
    setSelectedCard(card);
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCard(null);
  };

  useEffect(() => {
    fetchAllData(); // Fetch all data on component mount
  }, []);

  return (
    <>
      <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-center text-2xl text-white shadow-lg">
        Activity Cards
      </h1>

      {/* Category Tabs */}
      <div className="mb-4 flex justify-center pt-8">
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {categories.map((category) => (
            <Tab key={category} label={category.charAt(0).toUpperCase() + category.slice(1)} value={category} />
          ))}
        </Tabs>
      </div>

      <div className="mb-4 flex justify-center pt-8">
        <TextField
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          label="Select Date"
          variant="outlined"
          className="w-64 bg-white shadow-md rounded-md"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : (
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {data.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-80 md:w-96"
            >
              <Card className="rounded-lg border border-gray-300 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <Typography variant="h6" component="div" className="text-xl font-bold text-white">
                      {item.activity}
                    </Typography>
                    <IconButton onClick={() => handleCopyToClipboard(item)} color="primary">
                      <FileCopy />
                    </IconButton>
                  </div>
                  <Typography variant="body2" color="textSecondary" className="mb-3 text-white">
                    <strong>Category:</strong> {item.category}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className="mb-3 text-white">
                    <strong>Objective:</strong> {item.objective}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className="mb-3 text-white">
                    <strong>Materials:</strong> {item.material}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className="mb-3 text-white">
                    <strong>Example:</strong> {item.example}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className="text-sm text-white">
                    <strong>Activity Date:</strong> {new Date(item.date).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions className="flex justify-end p-4">
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    className="bg-gradient-to-r from-purple-500 to-pink-500"
                    onClick={() => handleOpenDialog(item)} // Open dialog with selected card
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Dialog for card details */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
          <Typography variant="h6" className="font-bold">
            {selectedCard?.activity}
          </Typography>
        </DialogTitle>
        <DialogContent className="bg-gray-800 text-white p-6">
          <Typography variant="h6" className="mb-2"><strong>Objective:</strong> {selectedCard?.objective}</Typography>
          <Typography variant="body2" className="mb-3"><strong>Materials:</strong> {selectedCard?.material}</Typography>
          <Typography variant="body2" className="mb-3"><strong>Example:</strong> {selectedCard?.example}</Typography>
          <Typography variant="body2" className="mb-3"><strong>Activity Date:</strong> {new Date(selectedCard?.date).toLocaleDateString()}</Typography>
        </DialogContent>
        <DialogActions className="bg-gray-900 p-4">
          <Button
            onClick={handleCloseDialog}
            color="secondary"
            variant="contained"
            className="bg-gradient-to-r from-purple-500 to-pink-500"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cards;
