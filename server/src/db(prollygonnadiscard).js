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

// // module.exports = client;

// // const CatSchema = mongoose.Schema({
// //     name:String,
// //     age:Number,
// //     test:Boolean
// // })

// // const Cat = mongoose.model("Cat", CatSchema);

// // // const kitty = new Cat({ name: 'Zildjian' });
// // const pussy = new Cat(
// //     {
// //         name:"Omer",
// //         age:69,
// //         test:true
// //     }
// // );
// // const kitty = new Cat(
// //     {
// //         name:"Muiz gandu",
// //         age:70,
// //         test:false
// //     }
// // );

// // Cat.insertMany([pussy, kitty],(err)=>{
// //     if(err)
// //     {
// //         console.log(err);
// //     }
// //     else{
// //         console.log("Succesfully inserted ");
// //     }
// // });
// // kitty.save().then(() => console.log('meow'));
