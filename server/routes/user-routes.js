const express = require('express');

const HttpError = require('../models/http-error');

const router = express.Router();

let LOGGED_IN_USER = {};

// @route    POST api/items/
// @desc     Create new item
// @access   Public
router.post('/', (req, res) => {
  const user = req.body;

  if (!user) {
    throw new HttpError('Invalid input! Please enter a valid item');
  }

  LOGGED_IN_USER = user;
  res.status(201).json({ message: 'New logged in user.', user });
});

module.exports = router;
