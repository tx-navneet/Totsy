const express = require('express');
const sequelize = require('./config/database');
const uploadRoutes = require('./routes/uploadRoutes');
const morgan = require("morgan");
const cors = require("cors");  // Import CORS

const app = express();

// Enable CORS for all routes (all domains, GET, POST, PUT, DELETE)
app.use(cors({ origin: '*', methods: 'GET,POST,PUT,DELETE' }));

app.use(morgan("dev"));
app.use(express.json());
app.use('/api', uploadRoutes);

const PORT = process.env.PORT || 9090; // Default port is 9090

// Sync database
sequelize.sync()
  .then(() => console.log('Database synced successfully'))
  .catch(err => console.error('Error syncing database:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
