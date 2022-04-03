const mongoose = require('mongoose');
const user = require('./user_model.js');

const eventschema = new mongoose.Schema({
  event_title : {
    type: String,
    required: true,
  }, 
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  start_time:{
    type: Date,
    required: true
  },
  end_time: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  going_users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]
});

const eventmodel = mongoose.model('events', eventschema);
module.exports = eventmodel;