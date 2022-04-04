// const events = require('./models/event_model.js');
// const users = require('./models/user_model.js');
// const spaces = require('./models/space_model.js');

const app = require('./app');
const dbConnection = require('./db');

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));
// app.listen(port, () => console.log('Example app listening on port 3001!'));
