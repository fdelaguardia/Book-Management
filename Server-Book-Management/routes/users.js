var express = require('express');
var router = express.Router();

const User = require('../models/User')

/* GET users listing. */
router.get('/profile/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .populate('favoriteBooks')
    .populate('currentlyReading')
    .then((foundUser) => {
      res.json(foundUser)
    })
    .catch((err) => {
      console.log(err)
    })
});

module.exports = router;
