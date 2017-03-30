'use strict'

let db = require('../config.js');
let model = require('../models/index.js');

//query database to get all events

module.exports = (req, res) => {
  console.log(req.user.user_id);
  model.getEvents(req.user.user_id)
  .then( (results) => {
    res.status(200).json(results);
  })
  .catch( (error) => {
    res.status(404).send(error);
  });
};
