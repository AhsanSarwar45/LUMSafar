const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		minlength: 1,
		required: true
	},
	bio: {
		type: String
	},
	interests: [
		{
			type: String
		}
	],
	profilePicPath: {
		type: String,
		required: true
	},
	
	flag: {
		type: Boolean,
		required: true
	},
	accountType: {
		type: String,
		enum: [ 'student', 'society' ],
		required: true
	},
	friendRequests: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		}
	],
	sentFriendRequests: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		}
	],
	friends: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		}
	],
	following: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		}
	],
	followers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		}
	]
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
