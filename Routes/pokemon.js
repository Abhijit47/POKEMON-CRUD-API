const express = require('express');
const router = express.Router();
const Pokemon = require('../Model/Pokemon');
const { createDataValidation } = require('../Utils/validation');
const verify = require('../Middleware/verifyToken');

//! ROUTE 1 : GET All Pokemon, /api/v1/all-pokemons, Login Required
router.get('/all-pokemons', verify, async (req, res) => {

  try {
    const pokemons = await Pokemon.find({ user: req.user._id });

    res.status(200).json({ pokemons });
  } catch (error) {
    res.status(400).json({ "message": "Data can't fetched successfully" });
  }
});

//! ROUTE 2 : GET One Pokemon By ID, /api/v1/pokemon/:id, Login Required
router.get('/pokemon/:id', verify, async (req, res) => {
  const pokemonId = req.params.id;
  try {
    const pokemon = await Pokemon.findById(pokemonId);
    res.status(200).json({ pokemon });
  } catch (error) {
    res.status(400).json({ "message": "Data can't fetched successfully" });
  }
});

//! ROUTE 3 : POST Create Pokemon, /api/v1/all-pokemons, Login Required
router.post('/all-pokemons', verify, async (req, res) => {
  // LETS VALIDATE DATA THAT USER ENTERED IN BODY
  const { error } = createDataValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Check if data is already entered or not
  const checkData = await Pokemon.findOne({ name: req.body.name });
  if (checkData) {
    return res.status(400).json({ "Message": "Data is already stored. Try something new!" });
  }

  // Create new pokemon data
  const newPokemon = new Pokemon({
    name: req.body.name,
    url: req.body.url,
    user: req.user._id
  });

  // Save the created pokemon to the DB
  try {
    const savedPokemon = await newPokemon.save();
    res.status(201).json({ data: savedPokemon });
  } catch (error) {
    res.status(400).json({ "error": error.message });
  }

});

//! ROUTE 4 : PUT One Pokemon By ID, /api/v1/all-pokemons, Login Required
router.put('/pokemon/:id', verify, async (req, res) => {

  // LETS GET THE ID FROM THE REQUEST
  const pokemonId = req.params.id;
  // try {
  //   const pokemon = await Pokemon.findById(pokemonId);
  //   res.status(200).json({ pokemon });
  // } catch (error) {
  //   res.status(400).json({ "message": "Data can't fetched successfully" });
  // }

  res.status(200).json({ "message": "Your request are not possible fullfill at this moment" });

  // UPDATE BY RESPECTD ID TO THE DATABASE

});

//! ROUTE 5 : DELET One Pokemon By ID, /api/v1/pokemon/:id, Login Required
router.delete('/pokemon/:id', verify, async (req, res) => {
  // LETS GET THE ID FROM THE REQUEST
  const pokemonId = req.params.id;
  // try {
  //   const pokemon = await Pokemon.findById(pokemonId);
  //   res.status(200).json({ pokemon });
  // } catch (error) {
  //   res.status(400).json({ "message": "Data can't fetched successfully" });
  // }

  res.status(200).json({ "message": "Your request are not possible fullfill at this moment" });

  // DELETE BY RESPECTD ID FROM THE DATABASE
});

module.exports = router;