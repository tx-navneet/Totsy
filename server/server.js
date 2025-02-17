const express = require('express');
const sequelize = require('./config/database');
const uploadRoutes = require('./routes/uploadRoutes');
const morgan = require("morgan")
const path = require('path')

const app = express();
app.use(morgan("dev"))
app.use(express.json());
app.use('/api', uploadRoutes);
app.use(express.static(path.join(__dirname,"../client/dist")))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../client/dist","index.html"))
})

const PORT = process.env.PORT || 4040;

// Sync database
sequelize.sync()
  .then(() => console.log('Database synced successfully'))
  .catch(err => console.error('Error syncing database:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
