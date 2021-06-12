const express = require('express');
const uuid = require('uuid').v4;

const HttpError = require('../models/http-error');

const router = express.Router();

let DUMMY_ITEMS = [];

// @route    GET api/items/
// @desc     Get items
// @access   Public
router.get('/', (req, res) => {
  res.status(200).json({ items: DUMMY_ITEMS });
});

// @route    POST api/items/
// @desc     Create new item
// @access   Public
router.post('/', (req, res) => {
  const name = req.body.name;
  const createdItem = {
    id: uuid(),
    name,
  };
  DUMMY_ITEMS.push(createdItem);
  res.status(201).json({ item: createdItem });
});

// @route    DELETE api/items/:id
// @desc     Delete item
// @access   Public
router.delete('/:id', (req, res) => {
  const itemId = req.params.id;
  DUMMY_ITEMS = DUMMY_ITEMS.filter((p) => p.id !== itemId);
  res.status(200).json({ message: 'Deleted item.' });
});

module.exports = router;
