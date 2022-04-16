const uri = 'mongodb+srv://admin:admin@cluster0.trz98.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongoose = require('mongoose');

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
};

mongoose.connect(uri, options);
const connection = mongoose.connection;

connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});

module.exports = connection;

// const mongoose = require('mongoose');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const events = require('./models/event_model.js');
// const users = require('./models/user_model.js');
// const spaces = require('./models/space_model.js');

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.log(err));

// // let connectDb = mongoose.connect('mongodb+srv://Lumsafar:bulbul123@cluster0.trz98.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

// const client = new MongoClient(uri, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	serverApi: ServerApiVersion.v1
// });

// client.connect((err) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		const collection = client.db('test').collection('devices');
// 		// perform actions on the collection object
// 		client.close();
// 	}
// });
