const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Require app
const app = require('./app');

// Configuration file
dotenv.config({ path: './config.env' });

//!Define port
const PORT = process.env.PORT || 9999;

//! Connect to DB
//Connect DB
const DB = process.env.DATABASE_URI.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB)
  .then(() => console.log("Connection Successful ✔"))
  .catch(() => console.log("Something went wrong in connection ❌"));


app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});