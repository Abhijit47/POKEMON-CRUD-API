const express = require('express');
const authUser = require('./Routes/userAuth');
const pokemonRoutes = require('./Routes/pokemon');
const cors = require('cors');

// Intialize app with express
const app = express();

app.enable('trust proxy');

// GLOBAL MIDDLEWARES
app.use(cors());

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '20kb' }));


//* Default route
app.get('/', (req, res) => {
  res.status(200).json({ "message": "Welcome to Pokemon CRUD API" });
});

//* IMPORT All Routes here
app.use('/api/v1', authUser);
app.use('/api/v1', pokemonRoutes);


//! Garbage route
app.all('*', (req, res) => {
  res.status(404).json({ "message": `Can't find ${req.originalUrl} on this server!` });
});

module.exports = app;