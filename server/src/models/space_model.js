const mongoose = require('mongoose');
const user = require('./user_model.js');

const spaceschema = new mongoose.Schema({
  space_title : {
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
  space_attendees:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]
});

const spacemodel = mongoose.model('spaces', spaceschema);
module.exports = spacemodel;