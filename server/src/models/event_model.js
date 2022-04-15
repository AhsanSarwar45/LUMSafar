const mongoose = require('mongoose');
const user = require('./user_model.js');

const eventSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},

	creatorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	creatorUsername: {
		type: string,
		required: true
	},
	description: {
		type: String
	},
	location: {
		type: String,
		required: true
	},
	tags: [
		{
			type: String
		}
	],
	startTime: {
		type: Number,
		required: true
	},
	endTime: {
		type: Number,
		required: true
	},
	interestedUsers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		}
	],
	imagePath: {
		type: String
	}
});

const eventModel = mongoose.model('events', eventSchema);
module.exports = eventModel;
