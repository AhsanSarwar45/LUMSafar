const router = require('express').Router();
let Event = require('../models/event_model.js');
const { find } = require('../models/user_model.js');
let User = require('../models/user_model.js');

router.route('/').get((req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/view').get((req,res) => {
    event_title = req.body.event_title
    created_by = req.body.created_by

    Event.find({event_title: event_title, created_by: created_by}).then((err,data) => {
        if(err)
        {
            res.json('failure');
			console.log(`[event-view] ${email}: failure: ${err}`);
        }
        else if(data) {
            res.json(data)
        }
        else{
            res.json('event-not-found');
			console.log(`[event-view] ${email}`);
        }
    })
})




router.route('/add').post((req, res) => {
    const event_title = req.body.event_title;
    const created_by = req.body.created_by;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const date = req.body.date;
    const going_users = req.body.going_users;

    const newEvent = new Event({event_title, created_by, start_time, end_time, date, going_users});
    newEvent.save()
        .then(() => res.json("Event added!"))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
    Event.findById(req.params.id)
        .then(event => {
            event.event_title = req.body.event_title;
            event.created_by = req.body.created_by;
            event.start_time = req.body.start_time;
            event.end_time = req.body.end_time;
            event.date = req.body.date;
            event.going_users = req.body.going_users;

            event.save()
                .then(() => res.json("Event updated!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));

})

router.route('/add-remove-interest').post((req,res) => {
  
    let event_title = req.body.event_title
    let creator = req.body.created_by
    let email = req.body.email
    
    const user = User.find({email:email})


    Event.find({event_title: event_title, created_by: creator}).then((err, data) =>{
        if (err) {
			res.json('failure');
			console.log(`[event-interest/addition] ${email}: failure: ${err}`);

		} else if (data) {
            Event.find({event_title: event_title, created_by: creator, going_users: email}).then((err2,data2)=>{
                if (err2) {
                    res.json('failure-2');
			        console.log(`[event-interest/addition] ${email}: failure: ${err}`);
                }
                else if (data2) {
                    res.json('already-marked-as-interested')
                    Event.updateOne(
                        { event_title: event_title, creator: creator},
                        { $pull: { going_users: user._id} }
                     )
                }

                else{
                    Event.updateOne(
                            { event_title: event_title, creator: creator},
                            { $push: { going_users: user._id} }
                         )
                }
            })
            
            
        } else {
            res.json('event-does-not-exist');
		}
    })

    //  User.where({ email: req.body.email }).findOne((err, user) => {
	// 	if (err) {
	// 		res.json('failure');
	// 		console.log(`[user/exists] ${email}: failure: ${err}`);

	// 	} else if (user) {
    //         res.json('already-marked-as-interested');
	// 		console.log(`[user/exists] ${email}: not-found`);
            
    //     } else {
    //         res.json('marked-as-interested');
    //         console.log(`[user/exists] ${email}: success`);
    //         Event.updateOne(
    //             { event_title: event_title, creator: creator},
    //             { $push: { going_users: user} }
    //          )
	// 	}
	// });
})

router.route('/search-event').get((req, res) => {


    const event_title_query = req.body.event_title;
    const created_by_query = req.body.created_by;

    Event.where( { event_title: event_title_query , created_by: created_by_query } ).findOne((err, event) => {

        if (err) console.log(err);
		if (event) {
            // query result is not null
            console.log('query successful', result);
            res.json(result);
		} else {
            res.json('no_match');
        }

    })
})

module.exports = router;