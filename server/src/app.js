const express = require('express');
const userRouter = require('./routes/users');
const eventRouter = require('./routes/events');

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/events', eventRouter);

app.get('/test', (req, res) => {
	res.status(200).send('Working');
});

module.exports = app;
