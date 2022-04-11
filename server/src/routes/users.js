const router = require('express').Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
let User = require('../models/user_model.js');

// * HEAVY BRO

router.route('/').get((req, res) => {
	User.find().then((users) => res.json(users)).catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const isSociety = req.body.isSociety;

	console.log(`[user/add] ${email}: received`);

	const newUser = new User({ username, email, password, isSociety });

	// TODO: Encrypt password

	newUser
		.save()
		.then(() => {
			res.json('success');
			console.log(`[user/add] ${email}: success`);
		})
		.catch((err) => {
			res.json('failure: ', err);
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
			res.json('not-found');
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

	let verCode = crypto.randomBytes(2).toString('hex');

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

	console.log(`[user/set-username] ${email}: success`);

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

router.route('/set-password').post((req, res) => {
	console.log('user/set-password: received');
	const email = req.body.email;
	const password = req.body.password;

	// set the new password of the email

	// if successful, return 'success'
	// else return 'failure'

	res.json('success');
	console.log('user/set-password: success');
});

router.route('/login').post((req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	console.log(`[user/login] ${email} : received`);
	User.where({ email: email, password: password }).findOne((err, user) => {
		if (err) {
			res.status(400).json('failure');
			console.log(`[user/login] ${email} : failure: ${err}`);
		} else {
			if (user) {
				//check if a doc was found
				res.json('success');
				// TODO: return the entire user document
				console.log(`[user/login] ${email} : success`);
			} else {
				res.json('not-found');
				console.log(`[user/login] ${email} : not-found`);
			}
			// res.json(user);
		}
	});
	// console.log('-----------------------');
});

router.route('/:id').get((req, res) => {
	User.findById(req.params.id).then((user) => res.json(user)).catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then(() => res.json('User deleted.'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
	User.findById(req.params.id) // returns doc
		.then((user) => {
			user.email = req.body.email;
			user.password = req.body.password;
			user.isSociety = req.body.isSociety;

			user.save().then(() => res.json('User updated!')).catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/follower-menu').post((req,res) => {
	
})


module.exports = router;
