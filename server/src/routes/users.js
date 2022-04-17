const router = require('express').Router();
const nodemailer = require('nodemailer');
const { randomBytes, createHash } = require('crypto');
let User = require('../models/user_model.js');
let Event = require('../models/event_model.js');
const { route } = require('./events.js');
const mongoose = require('mongoose');

// * HEAVY BRO

function hash(string) {
	return createHash('sha256').update(string).digest('hex');
}

router.route('/').get((req, res) => {
	User.find().then((users) => res.json(users)).catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = hash(req.body.password);
	const accountType = req.body.accountType;

	console.log(`[user/add] ${email}: received`);

	const newUser = new User({
		username: username,
		email: email,
		password: password,
		accountType: accountType,
		profilePicPath: 'https://www.gravatar.com/avatar/0?d=mp',
		bio: 'Empty'
	});

	// TODO: Encrypt password. beshak

	newUser
		.save()
		.then(() => {
			res.json(newUser);
			console.log(`[user/add] ${email}: success`);
		})
		.catch((err) => {
			res.json('failure');
			console.log(`[user/add] ${email}: failure: ${err}`);
		});
});

router.route('/exists').post((req, res) => {
	const email = req.body.email;

	console.log(`[user/exists] ${email}: received`);

	// if email exists send 'success'
	// else send 'not-found'
	User.where({ email: req.body.email }).findOne((err, user) => {
		if (err) {
			res.json('failure');
			console.log(`[user/exists] ${email}: failure: ${err}`);
		} else if (user) {
			res.json('not-found'); // ! Don't forget to change this to 'success' after testing
			console.log(`[user/exists] ${email}: success`);
		} else {
			res.json('not-found');
			console.log(`[user/exists] ${email}: not-found`);
		}
	});
	// res.json('not-found');
	// console.log('user/exists: not-found');
});

router.route('/send-email').post((req, res) => {
	const email = req.body.email;

	console.log(`[user/send-email] ${email}: received`);

	let verCode = randomBytes(2).toString('hex');

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'lumsafar@gmail.com',
			pass: 'Boy06304'
		}
	});

	let mailOptions = {
		from: 'lumsafar@gmail.com',
		to: email,
		subject: 'LUMSafar Verification Code',
		html: `
		<meta charset="UTF-8">
		<p>Hello!</p>
		<p>Your 4-digit verification code is:</p>
		<h1 style="text-align:center">${verCode}</h1>
		<p>If you haven't signed up for LUMSafar, please ignore this email. It just means that somebody is trying to impersonate you 💀.</p><br/>
		<p>Regards,<br/>LUMSafar Team (Za Tehc Boiz)</p>
		`
	};

	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(`[user/send-email] ${email}: failure: ${err}`);
			res.json('failure');
		} else {
			console.log(`[user/send-email] ${email}: success`);
			res.json(verCode);
		}
	});

	// send email to user containing verification code

	// if successful, return 'success'
	// else return 'failure'
});

router.route('/set-username').post((req, res) => {
	const email = req.body.email;
	const name = req.body.name;

	console.log(`[user/set-username] ${email}: received`);

	// set the new username of the email
	// check ahsan side client, what ahsan sending. fetch that doc which u need to change,then update it
	User.where({ email: email }).findOne((err, user) => {
		if (err) {
			res.json('failure');
			console.log(`[user/set-username] ${email}: failure: ${err}`);
		} else {
			// find one returns doc entry, which u update and return to database
			user.username = name;
			user
				.save()
				.then(() => {
					res.json('success');
					console.log(`[user/set-username] ${email}: success`);
				})
				.catch((err) => {
					res.json('failure');
					console.log(`[user/set-username] ${email}: failure: ${err}`);
				});
		}
	});

	// if successful, return 'success'
	// else return 'failure'

	// res.json('success');
	// console.log('user/set-username: success');
});

//TODO make another endpoint 'verify-password' which check if email-password combination exists

router.route('/set-password').post((req, res) => {
	const email = req.body.email;
	const passwordNew = hash(req.body.passwordNew);

	// set the new password of the email

	console.log(`[user/set-password] ${email}: received`);

	// set the new username of the email
	User.where({ email: email }).findOne((err, user) => {
		if (err) {
			res.json('failure');
			console.log(`[user/set-username] ${email}: failure: ${err}`);
		} else {
			// find one returns doc entry, which u update and return to database
			user.password = passwordNew;
			user
				.save()
				.then(() => {
					res.json('success');
					console.log(`[user/set-password] ${email}: success`);
				})
				.catch((err) => {
					res.json('failure');
					console.log(`[user/set-password] ${email}: failure: ${err}`);
				});
		}
	});
});

/*

router.route('/verify-password').post((req, res) => {
	const passwordOld = req.body.passwordOld;
	const passwordNew = req.body.passwordNew;
	const email = req.body.email;

	// check if passwordOld-email combo exists in database or not
	User.where({ email: email, password: passwordOld }).findOne((err, user) => {

		if (err) {
			res.json('failure');
			console.log(`[user/set-username] ${email}: failure: ${err}`);
		}
		else {
			user.password = passwordNew;
			user
				.save()
				.then(() => {
					res.json('success');
					console.log(`[user/set-password] ${email}: success`);
				})
				.catch((err) => {
					res.json('failure');
					console.log(`[user/set-password] ${email}: failure: ${err}`);
				});
		}
});

*/

router.route('/login').post((req, res) => {
	const email = req.body.email;
	const password = hash(req.body.password);

	console.log(`[user/login] ${email}: received`);
	User.where({ email: email, password: password }).findOne((err, user) => {
		if (err) {
			res.status(400).json('failure');
			console.log(`[user/login] ${email}: failure: ${err}`);
		} else {
			if (user) {
				//check if a doc was foundzz
				//added status element in the json object. Its sent along with the rest of the doc
				res.json(user);
				// TODO: return the entire user document
				console.log(`[user/login] ${email}: success`);
			} else {
				res.json('not-found');
				console.log(`[user/login] ${email}: not-found`);
			}
			// res.json(user);
		}
	});
	// console.log('-----------------------');
});

router.route('/:id').get((req, res) => {
	const id = req.params.id;
	console.log(`[user/:id] ${id} : received`);

	User.findById(id)
		.then((user) => {
			res.json(user);
			console.log(`[user/:id] ${id} : success`);
		})
		.catch((err) => {
			res.status(400).json('failure');
			console.log(`[user/:id] ${id} : failure`);
		});
});

router.route('/:id').delete((req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then(() => res.json('User deleted.'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
	const userId = req.params.id;
	console.log(`[user/update] ${userId}: received`);

	User.findById(userId) // returns doc
		.then((user) => {
			user.username = req.body.username;
			user.bio = req.body.bio;
			user.interests = req.body.interests;
			user.profilePicPath = req.body.profilePicPath;
			user
				.save()
				.then(() => {
					Event.where({ creatorId: userId })
						.then((events) => {
							// console.log(events);
							promises = [];

							events.forEach((event) => {
								event.creatorUsername = req.body.username;

								promises.push(event.save());
							});
							Promise.all(promises)
								.then(() => {
									res.json('success');
									console.log(`[user/update] ${userId}: success`);
								})
								.catch((err) => {
									res.status(400).json('failure');
									console.log(`[user/update] ${userId}: failure: ${err}`);
								});
						})
						.catch((err) => {
							res.status(400).json('failure');
							console.log(`[user/update] ${userId}: failure: ${err}`);
						});
				})
				.catch((err) => {
					res.status(400).json('failure');
					console.log(`[user/update] ${userId}: failure: ${err}`);
				});
		})
		.catch((err) => {
			res.status(400).json('failure');
			console.log(`[user/update] ${userId}: failure: ${err}`);
		});
});

router.route('/following-menu').post((req, res) => {
	let email = req.body.email;

	User.find({ email: email }).then((err, data) => {
		if (err) {
			res.json('failed to fetch following');
		} else {
			res.send({
				following: data.following // orthe correct notation
			});
		}
	});
});

router.route('/set-profile-pic').post((req, res) => {
	const userId = mongoose.Types.ObjectId(req.body.userId);
	const imagePath = req.body.imagePath;

	User.findById(userId, (err, user) => {
		user.imagePath = imagePath;
		user
			.save()
			.then(() => {
				res.json('success');
				console.log('[user/set-profile-pic] success');
			})
			.catch((err) => {
				res.json('failure');
				console.log('[user/set-profile-pic] failure');
			});
	});
});

router.route('/friends-menu').post((req, res) => {
	// dont think this is needed, since we will have the entire doc saved in local storage. We would need to update local storage after adding or removing friends/followers
	let email = req.body.email;

	User.find({ email: email }).then((err, data) => {
		if (err) {
			res.json('failed to fetch friends');
		} else {
			res.send({
				friends: data.friends // orthe correct notation
			});
		}
	});
});

router.route('/friend-request').post((req, res) => {
	let own_id = req.body.own_id;
	let friend_id = req.body.friend_id;

	User.findById(own_id)
		.then((user) => {
			user.sentFriendRequests.push(friend_id);
			user.save()
				.then(() => {
					User.findById(friend_id)
						.then((user_friend) => {
							user_friend.friendRequests.push(own_id);
							user_friend.save()
								.then(() => {
									res.json('success');
									console.log('[user/friend-request] success');
								})
								.catch((err) => {
									res.json('failure');
									console.log('[user/friend-request] failure saving friend');
								});
						})
						.catch((err) => {
							res.json('failure');
							console.log('[user/friend-request] failure retrieving friend');
						});
				})
				.catch((err) => {
					res.json('failure');
					console.log('[user/friend-request] failure saving user');
				});
		})
		.catch((err) => {
			res.json('failure');
			console.log('[user/friend-request] failure retrieving own_id');
		});
});

router.route('/accept-request').post((req, res) => {
	let own_id = req.body.own_id;
	let friend_id = req.body.friend_id;

	User.findById(own_id)
		.then((user) => {
			user.friends.push(friend_id);
			user.friendRequests.pull( { _id: friend_id });
			user
				.save()
				.then(() => {
					User.findById(friend_id).then((user_friend) => {
						user_friend.friends.push(own_id);
						user_friend.sentFriendRequests.pull( { _id: own_id });
						user_friend
							.save()
							.then(() => {
								res.json('handshake-complete');
								console.log(`[user/accept-request: success]`);
							})
							.catch((err) => {
								res.json('handshake-failed');
								console.log(`[user/accept-request]: failed : ${err}`);
							});
					});
				})
				.catch((err) => {
					res.json('failure');
					console.log(`[user/accept-request] failure ${err}`);
				});
		})
		.catch((err) => {
			res.json('failure');
			console.log(`[user/friend-request]: failure fetching user : ${err}`);
		});
});

router.route('/show-friend-requests').post((req, res) => {
	let own_id = req.body.own_id; //or should it be _id

	User.findById(own_id)
		.then((user) => {
			res.json({ friendRequests: user.friendRequests });
		})
		.catch((err) => {
			res.json('failure');
			console.log(`[user/show-friend-requests]: failure fetching friend requests : ${err}`);
		});
});

router.route('/follow-user').post((req, res) => {
	let own_id = req.body.own_id;
	let friend_id = req.body.friend_id;

	User.findById(own_id)
		.then((user) => {
			user.following.push(friend_id);
			user
				.save()
				.then(() => {
					res.json('success');
					console.log(`[user/follow-user] ${friend_id}: success`);
				})
				.catch((err) => {
					res.json('failure');
					console.log(`[user/friend-request] failure ${err}`);
				});
		})
		.catch((err) => {
			res.json('failure');
			console.log(`[user/follow-user]: failure fetching user : ${err}`);
		});
});

router.route('/search').post((req, res) => {
	//this is a multipurpose function, that can work with any search type e.g users/events/friends, by specifying in search type
	const query = req.body.query;
	const searchType = req.body.searchType;
	const userId = req.body.userId;

	if (searchType === 'users') {
		User.find({
			$or: [ { username: { $regex: query, $options: 'i' } }, { email: { $regex: query, $options: 'i' } } ]
		})
			.then((docs) => {
				console.log(`[users/search] ${query}: success`);
				// console.log(docs);
				res.json(docs);
			})
			.catch((err) => {
				// console.log(err);
				console.log(`[users/search] ${query}: failure: ${err}`);
				res.json('failure');
			});
	} else {
		User.findById(userId)
			.then((user) => {
				const searchArray = searchType === 'following' ? user.following : user.friends;
				User.find({
					_id: { $in: searchArray },
					$or: [ { username: { $regex: query, $options: 'i' } }, { email: { $regex: query, $options: 'i' } } ]
				})
					.then((docs) => {
						console.log(`[users/search] ${query}: success`);
						// console.log(docs);
						res.json(docs);
					})
					.catch((err) => {
						// console.log(err);
						console.log(`[users/search] ${query}: failure: ${err}`);
						res.json('failure');
					});
			})
			.catch((err) => {
				res.status(400).json('failure');
				console.log(`[user/search]: failure: ${err}`);
			});
	}
});

module.exports = router;
