const router = require('express').Router();
let Event = require('../models/event_model.js');

router.route('/').get((req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
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

module.exports = router;