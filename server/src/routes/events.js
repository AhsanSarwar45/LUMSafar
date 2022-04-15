const router = require('express').Router();
let Event = require('../models/event_model.js');
const { find } = require('../models/user_model.js');
let User = require('../models/user_model.js');

router.route('/').get((req, res) => {
	Event.find().then((events) => res.json(events)).catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/view').get((req, res) => {
	const title = req.body.title;
	const creator = req.body.creator;
	console.log(`[events/view] ${title}: received`);

	Event.find({ title: title, creator: creator }).then((err, data) => {
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

	const newEvent = new Event(req.body);
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
	Event.findById(req.params.id)
		.then((event) => {
			event = req.body;

			event.save().then(() => res.json('Event updated!')).catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add-remove-interest').post((req, res) => {
	const title = req.body.title;
	const creator = req.body.creator;
	const email = req.body.email;

	const user = User.find({ email: email });

	Event.find({ title: title, creator: creator }).then((err, data) => {
		if (err) {
			res.json('failure');
			console.log(`[event-interest/addition] ${email}: failure: ${err}`);
		} else if (data) {
			Event.find({
				title: title,
				creator: creator,
				interestedUsers: email
			}).then((err2, data2) => {
				if (err2) {
					res.json('failure-2');
					console.log(`[event-interest/addition] ${email}: failure: ${err}`);
				} else if (data2) {
					res.json('already-marked-as-interested');
					Event.updateOne({ title: title, creator: creator }, { $pull: { interestedUsers: user._id } });
				} else {
					Event.updateOne({ title: title, creator: creator }, { $push: { interestedUsers: user._id } });
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
	//             { title: title, creator: creator},
	//             { $push: { interestedUsers: user} }
	//          )
	// 	}
	// });
});

router.route('/search-event').get((req, res) => {
	const event_title_query = req.body.title;
	const created_by_query = req.body.creator;

	Event.where({ title: event_title_query, creator: created_by_query }).findOne((err, event) => {
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
