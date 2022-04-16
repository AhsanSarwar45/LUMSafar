const router = require('express').Router();
const mongoose = require('mongoose');
const Events = require('../models/event_model.js');
const Users = require('../models/user_model.js');

router.route('/').get((req, res) => {
	Events.find().then((events) => res.json(events)).catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/view').get((req, res) => {
	const title = req.body.title;
	const creatorId = req.body.creatorId;
	console.log(`[events/view] ${title}: received`);

	Events.find({ title: title, creatorId: creatorId }).then((err, data) => {
		if (err) {
			res.json('failure');
			console.log(`[events/view] ${title}: failure: ${err}`);
		} else if (data) {
			res.json(data);
			console.log(`[events/view] ${title}: success`);
		} else {
			res.json('not-found');
			console.log(`[events/view] ${title}: not-found`);
		}
	});
});

router.route('/add').post((req, res) => {
	const title = req.body.title;
	console.log(`[events/add] ${title}: received`);

	// const event = req.body;
	// const title = req.body.title;
	const creatorId = mongoose.Types.ObjectId(req.body.creatorId);
	const creatorUsername = req.body.creatorUsername;
	const description = req.body.description;
	const location = req.body.location;
	const tags = req.body.tags;
	const startTime = req.body.startTime;
	const endTime = req.body.endTime;
	const interestedUsers = req.body.interestedUsers;
	const imagePath = req.body.imagePath;

	// event.creatorId = mongoose.Types.ObjectId(event.creatorId);

	const newEvent = new Events({
		title,
		creatorId,
		creatorUsername,
		description,
		location,
		tags,
		startTime,
		endTime,
		interestedUsers,
		imagePath
	});
	newEvent
		.save()
		.then(() => {
			res.json('success');
			console.log(`[events/add] ${title}: success`);
		})
		.catch((err) => {
			res.status(400).json('failure');
			console.log(`[events/add] ${title}: failure : ${err}`);
		});
});

router.route('/update/:id').post((req, res) => {
	Events.findById(req.params.id)
		.then((event) => {
			event = req.body;

			event.save().then(() => res.json('Event updated!')).catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/toggle-interest').post((req, res) => {
	const eventId = mongoose.Types.ObjectId(req.body.eventId);
	const userId = mongoose.Types.ObjectId(req.body.userId);
	console.log(`[event-interest/toggle-interest] ${userId}: received`);

	Events.findById(eventId, (err, event) => {
		if (err) {
			res.json('failure finding');
			console.log(`[event-interest/toggle-interest] ${userId}: failure: ${err}`);
		} else {
			if (event.interestedUsers.includes(userId)) {
				const index = event.interestedUsers.indexOf(userId);
				if (index > -1) {
					event.interestedUsers.splice(index, 1); // 2nd parameter means remove one item only
				}
			} else {
				event.interestedUsers.push(userId);
			}

			event
				.save()
				.then(() => {
					res.json('success');
					console.log(`[event-interest/toggle-interest] ${userId}: success`);
				})
				.catch((err) => {
					res.json('failure');
					console.log(`[event-interest/toggle-interest] ${userId}: failure saving: ${err}`);
				});
		}
	});
});

router.route('/fetch-recommendations').post((req, res) => {
	let own_id = req.body.userId;
	let currentEvents = req.body.currentEvents.map((id) => mongoose.Types.ObjectId(id));
	// console.log(currentEvents);
	let promiseArray = [];

	console.log(`[event/fetch-recommendations] ${own_id}: received`);

	Users.findById(own_id).then((user) => {
		let following = user.following;
		let interests = user.interests;

		promiseArray.push(Events.find({ creator: { $in: following }, _id: { $nin: currentEvents } }).limit(4).exec());

		promiseArray.push(Events.find({ tags: { $in: interests }, _id: { $nin: currentEvents } }).limit(2).exec());

		promiseArray.push(
			Events.find({ interestedUsers: { $in: own_id }, _id: { $nin: currentEvents } }).limit(2).exec()
		);

		promiseArray.push(
			Events.aggregate([
				{ $match: { _id: { $nin: currentEvents } } },
				{
					$project: {
						title: 1,
						creatorId: 1,
						creatorUsername: 1,
						description: 1,
						location: 1,
						tags: 1,
						startTime: 1,
						endTime: 1,
						interestedUsers: 1,
						imagePath: 1,
						__v: 1,
						length: { $size: '$interestedUsers' }
					}
				},
				{ $sort: { length: -1 } },
				{ $limit: 4 }
			]).exec()
		);

		Promise.all(promiseArray).then(([ data1, data2, data3, data4 ]) => {
			let data = [ ...data2, ...data3, ...data4 ];
			data.forEach((element1) => {
				let check = false;
				data1.forEach((element2) => {
					if (element1._id.equals(element2._id)) {
						// console.log('working')
						check = true;
					}
				});
				if (!check) {
					// console.log("element pushed")
					data1.push(element1);
				}
			});

			// console.log(data1);
			console.log(data1);
			res.json(data1);
			console.log(`[event/fetch-recommendations] ${own_id}: success`);
		});
	});

	// function (err, result) {
	// 	result.forEach((event) => {
	// 		events_list.push(event);
	// 	});
	// 	res.json(result); //for testing purposes
	// }
});

router.route('/interested-users').post((req, res) => {
	const eventId = mongoose.Types.ObjectId(req.body.eventId);

	Events.findById(eventId, (err, event) => {
		if (err) {
			console.log(`[event/interested-users] ${eventId}: failure: ${err}`);
		} else {
			Users.find(
				{
					_id: { $in: event.interestedUsers }
				},
				function(err, users) {
					//  console.log(users);
					res.json(users);
				}
			);
		}
	});
});

router.route('/search').post(async (req, res) => {
	const query = req.body.query;
	console.log(`[event/search] ${query}: received`);

	Events.find( {$or: [{ title: {$regex: query, $options : 'i'} }, { location: {$regex: query, $options: 'i'} }]} )
		.then((docs) => {
			console.log(docs);
			res.json(docs);
		})
		.catch((err) => {
			console.log(err);
			res.json('failure')
		});
	// console.log(docs.length);
	// console.log(docs);
	// const created_by_query = req.body.creatorId;
	// Events.find({ email:`/${query}/` })
	// 	.then((result) => {
	// 		console.log(`[event/search] ${query}: success`);
	// 		res.json(result);
	// 		console.log(result);
	// 	})
	// 	.catch((err) => {
	// 		console.log(`[event/search] ${query}: failure: ${err}`);
	// 		res.json('failure');
	// 		console.log(err);
	// 	});

	// Events.where({ title: event_title_query, creatorId: created_by_query }).findOne((err, event) => {
	// 	if (err) console.log(err);
	// 	if (event) {
	// 		// query result is not null
	// 		console.log('query successful', result);
	// 		res.json(result);
	// 	} else {
	// 		res.json('no_match');
	// 	}
	// });
});

router.route('/friends-interested').post((req, res) => {
	let email = req.body.email;
	let event_title = req.body.event_title;
	let event_created_by = req.body.created_by;

	Users.find({ email: email }).then((user) => {
		Events.find({ title: event_title, creatorId: event_created_by })
			.then((event) => {
				let count = 0;

				for (let i = 0; i < user.friends.length; i++) {
					for (let j = 0; j < event.interestedUsers.length; j++) {
						if (event.interestedUsers[j] == user.friends[i]) {
							count = count + 1;
						}
					}
				}
				res.json(count);
			})
			.catch((err) => {
				console.log(`[event/friends-interested] ${event_title}: failure: ${err}`);
			});
	});
});

module.exports = router;
