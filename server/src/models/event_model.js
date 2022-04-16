const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-search');
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
		type: String,
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

eventSchema.plugin(mongoose_fuzzy_searching, {fields: ['title', 'location', 'tags']});
const eventModel = mongoose.model('events', eventSchema);

// module.exports = {
// 	eventModel: eventModel, 
// 	eventSearch: eventSearch
// }

module.exports = eventModel;
