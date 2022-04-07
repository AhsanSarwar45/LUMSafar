const router = require('express').Router();
let User = require('../models/user_model.js');

// * HEAVY BRO

router.route('/').get((req, res) => {
	User.find().then((users) => res.json(users)).catch((err) => res.status(400).json('Error: ' + err));
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

router.route('/validate').post((req, res) => {
	console.log('user/validate: received');
	const email = req.body.email;
	const password = req.body.password;
	const isSociety = req.body.isSociety;
	const verificationCode = req.body.verificationCode;

	// check for dup
	// send email to user containing verification code

	res.json('success');
	console.log('user/validate: success');
});

router.route('/forgot-password').post((req, res) => {
	console.log('user/validate: received');
	const email = req.body.email;
	const verificationCode = req.body.verificationCode;

	// send email to user containing verification code

	res.json('success');
	console.log('user/forgot-password: success');
});

router.route('/set-password').post((req, res) => {
	console.log('user/validate: received');
	const email = req.body.email;
	const password = req.body.password;

	// set the new password of the email

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
