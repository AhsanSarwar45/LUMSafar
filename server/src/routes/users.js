const router = require('express').Router();
const nodemailer = require('nodemailer');
let User = require('../models/user_model.js');

// * HEAVY BRO

router.route('/').get((req, res) => {
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	console.log('user/add: received');
	const email = req.body.email;
	const password = req.body.password;
	const isSociety = req.body.isSociety;

	const newUser = new User({ email, password, isSociety });

	newUser
		.save()
		.then(() => {
			res.json('success');
			console.log('user/add: success');
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/exists').post((req, res) => {
	console.log('user/exists: received');
	const email = req.body.email;

	// if email exists send 'success'
	// else send 'not-found'
	User.where({ email: req.body.email}).findOne((err, user) => {
		if (err) {
			res.status(400).json('Error: ' + err);
		} else if (user) {
			res.json('success');
			console.log('user/exists/success');
		} else {
			res.json('not-found');
			console.log('user/exists/not-found');
		}
	});
	// res.json('not-found');
	// console.log('user/exists: not-found');
});

router.route('/send-email').post((req, res) => {
	console.log('user/send-email: received');
	const email = req.body.email;
	const verificationCode = req.body.verificationCode;

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'lumsafar@gmail.com',
			pass: 'Boy06304'
		}
	});

	console.log(email)
	let mailOptions = {
		from: 'lumsafar@gmail.com',
		to: email,
		subject: 'Lumsafar Verification Code',
		text: `Your verification code is ${verificationCode}`
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		}
	});

	// send email to user containing verification code

	// if successful, return 'success'
	// else return 'failure'

	res.json('success');
	console.log('user/send-email: success');
});

router.route('/set-username').post((req, res) => {
	console.log('user/set-username: received');
	const email = req.body.email;
	const name = req.body.name;

	// set the new username of the email

	// if successful, return 'success'
	// else return 'failure'

	res.json('success');
	console.log('user/set-username: success');
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
	console.log('user/login: received');
	User.where({ email: req.body.email, password: req.body.password }).findOne((err, user) => {
		if (err) {
			res.status(400).json('Error: ' + err);
		} else {
			if (user) {
				//check if a doc was found
				res.json('success');
				console.log('user/login: success');
			} else {
				res.json('not-found');
				console.log('user/login: not-found');
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
	User.findById(req.params.id)
		.then((user) => {
			user.email = req.body.email;
			user.password = req.body.password;
			user.isSociety = req.body.isSociety;

			user.save().then(() => res.json('User updated!')).catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
