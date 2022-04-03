const express = require('express');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const events = require('./models/event_model.js');
const users = require('./models/user_model.js');
const spaces = require('./models/space_model.js');
const app = express();

app.use(express.json());

const uri = "mongodb+srv://Lumsafar:bulbul123@cluster0.trz98.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// let connectDb = mongoose.connect('mongodb+srv://Lumsafar:bulbul123@cluster0.trz98.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
	if (err){
		console.log(err);
	} else {
		const collection = client.db("test").collection("devices");
		// perform actions on the collection object
		client.close();
	}
  
});


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
