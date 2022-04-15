const mongoose = require('mongoose');
const user = require('./user_model.js');

const spaceschema = new mongoose.Schema({
	space_title: {
		type: String,
		required: true
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	startTime: {
		type: Date,
		required: true
	},
	endTime: {
		type: Date,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	space_attendees: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		}
	]
});

const spacemodel = mongoose.model('spaces', spaceschema);
module.exports = spacemodel;
