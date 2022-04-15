const mongoose = require('mongoose');


const userschema = new mongoose.Schema({
  username : {
    type: String,
  }, 
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password:{
    type: String,
    minlength: 1,
    required: true,
  },
  interests:[{
    type: String,
  }],
  picture_path:{
    type: String,
    required: false,
  },
  account_type:{
    type: String,
    enum: ["student", "society"],
  },
  friend_requests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]

});

const usermodel = mongoose.model('users', userschema);

module.exports = usermodel;