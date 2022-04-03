const express = require('express');
const app = express();

app.use(express.json());

app.get('/test', (req, res) => {
	res.status(200).send('Hello world');
});

app.post('/sign_up', (req, res) => {
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
