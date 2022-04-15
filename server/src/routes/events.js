const router = require('express').Router();
const mongoose = require('mongoose');
let Events = require('../models/event_model.js');
const { find } = require('../models/user_model.js');
let Users = require('../models/user_model.js');

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

	const event = req.body;
	event.creatorId = mongoose.Types.ObjectId(event.creatorId);

	const newEvent = new Events(event);
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

router.route('/add-remove-interest').post((req, res) => {
	const title = req.body.title;
	const creatorId = req.body.creatorId;
	const email = req.body.email;

	const user = Users.find({ email: email });

	Events.find({ title: title, creatorId: creatorId }).then((err, data) => {
		if (err) {
			res.json('failure');
			console.log(`[event-interest/addition] ${email}: failure: ${err}`);
		} else if (data) {
			Events.find({
				title: title,
				creatorId: creatorId,
				interestedUsers: email
			}).then((err2, data2) => {
				if (err2) {
					res.json('failure-2');
					console.log(`[event-interest/addition] ${email}: failure: ${err}`);
				} else if (data2) {
					res.json('already-marked-as-interested');
					Events.updateOne({ title: title, creatorId: creatorId }, { $pull: { interestedUsers: user._id } });
				} else {
					Events.updateOne({ title: title, creatorId: creatorId }, { $push: { interestedUsers: user._id } });
				}
			});
		} else {
			res.json('event-does-not-exist');
		}
	});

	//  User.where({ email: req.body.email }).findOne((err, user) => {
	// 	if (err) {
	// 		res.json('failure');
	// 		console.log(`[user/exists] ${email}: failure: ${err}`);

	// 	} else if (user) {
	//         res.json('already-marked-as-interested');
	// 		console.log(`[user/exists] ${email}: not-found`);

	//     } else {
	//         res.json('marked-as-interested');
	//         console.log(`[user/exists] ${email}: success`);
	//         Event.updateOne(
	//             { title: title, creatorId: creatorId},
	//             { $push: { interestedUsers: user} }
	//          )
	// 	}
	// });
});

router.route('/fetch-recommendations').post((req, res) => {
	let own_id = req.body.userId;
	let currentEvents = req.body.currentEvents;
	console.log(currentEvents);
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

router.route('/search-event').get((req, res) => {
	const event_title_query = req.body.title;
	const created_by_query = req.body.creatorId;

	Events.where({ title: event_title_query, creatorId: created_by_query }).findOne((err, event) => {
		if (err) console.log(err);
		if (event) {
			// query result is not null
			console.log('query successful', result);
			res.json(result);
		} else {
			res.json('no_match');
		}
	});
});

module.exports = router;
