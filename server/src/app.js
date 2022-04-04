const express = require('express');
const userRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use('/users', userRouter);

app.get('/test', (req, res) => {
	res.status(200).send('Hello world');
});

// Checks stuff like is duplicate etc.
app.post('/validate_sign_up', (req, res) => {
	// console.log(req.body);
	const email = req.body.email;
	const password = req.body.password;
	const isSociety = req.body.isSociety;

	// const user
	res.send('success');
});

app.post('/login', (req, res) => {
	console.log(req.body);
	res.send('success');
});

module.exports = app;
