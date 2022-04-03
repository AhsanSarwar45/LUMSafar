
// const events = require('./models/event_model.js');
// const users = require('./models/user_model.js');
// const spaces = require('./models/space_model.js');

const uri = 'mongodb+srv://admin:admin@cluster0.trz98.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3001;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const userRouter = require('./routes/users')

app.use('/users', userRouter)

app.listen(port, () => console.log(`Listening on port ${port}`))
// app.listen(port, () => console.log('Example app listening on port 3001!'));
