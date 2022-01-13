const router = require('express').Router();
const List = require('../models/List');

const verify = require('../verifyToken');

// CREATE
router.post('/', verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const saveList = await newList.save();
      res.status(200).json(saveList);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('You are not allowed!');
  }
});

// CREATE
router.delete('/:id', verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      new List.findByIdAndDelete(req.params.id);
      res.status(200).json('The list has been delete');
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('You are not allowed!');
  }
});

module.exports = router;
