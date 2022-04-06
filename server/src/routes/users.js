const router = require('express').Router();
let User = require('../models/user_model.js');

// * HEAVY BRO

router.route('/').get((req, res) => {
	User.find().then((users) => res.json(users)).catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	console.log('user add req received');
	const email = req.body.email;
	const password = req.body.password;
	const isSociety = req.body.isSociety;

	const newUser = new User({ email, password, isSociety });

	newUser.save().then(() => res.json('success')).catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
	console.log('login req received');
	User.where({ email: req.body.email, password: req.body.password }).findOne((err, user) => {
		if (err) {
			res.status(400).json('Error: ' + err);
		} else {
			if (user) {
				//check if a doc was found
				console.log('login req success');
				res.json('success');
			} else {
				console.log('no user found');
			}
			// res.json(user);
		}
	});
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
