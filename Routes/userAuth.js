const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/User');
const { registerValidation, loginValidation } = require('../Utils/validation');
const verify = require('../Middleware/verifyToken');

//! ROUTE 1 : Create one user with authentication POST: /api/v1/signup, Login Required
router.post('/signup', async (req, res) => {
  // 1. LETS VALIDATE A USER BEFORE CREATE A USER
  const { error } = registerValidation(req.body);

  // 2. If body field have any error return an error
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // 3. Check if user is exist or not
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).json({ "msg": "Email is alradey exists" });

  // 4. Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // 5. Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  // 6. Save the created user to DB
  try {
    const savedUser = await user.save();
    res.status(201).json({ "user": { _id: savedUser._id, name: savedUser.name, email: savedUser.email, created_at: savedUser.created_at } });
  } catch (error) {
    res.status(400).json({ "error": error.message });
  }

});

//! ROUTE 2 : Login user with authrization POST: /api/v1/login, Login Required
router.post('/login', async (req, res) => {
  let success = false;
  // 1. LETS VALIDATE A USER
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // 2. CHECK USER IS EXIST OR NOT
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    success = false;
    return res.status(400).json({ "message": "email or password wrong" });
  }
  // 3. CHECK PASSWORD IS CORRECT OR NOT
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    success = false;
    return res.status(400).json({ "message": "email or password wrong" });
  }
  // 4. CREATE AND ASSIGN A TOKEN
  const token = jwt.sign({ _id: user.id }, process.env.ACCESS_TOKEN_SECRET);
  success = true;
  res.header('auth-token', token).status(200).json({ success, token });
});

//! ROUTE 3 : Get one user details with authentication POST: /api/v1/user, Login Required
router.get('/user', verify, async (req, res) => {
  const findUser = req.user._id;

  try {
    const user = await User.findById({ _id: findUser });
    res.status(200).json({ id: user._id, name: user.name, email: user.email, created_at: user.created_at });
  } catch (error) {
    res.status(400).json({ "message": "credentials error" });
  }

});

module.exports = router;