const mongoose = require('mongoose');
const user = require('./user_model.js');

const eventschema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	description: {
		type: String,
		required: true
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
		type: number,
		required: true
	},
	endTime: {
		type: number,
		required: true
	},

	interestedUsers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		}
	],
	imagePath: {
		type: String,
		required: true
	}
});

const eventmodel = mongoose.model('events', eventschema);
module.exports = eventmodel;
