const express = require('express');
const meetingsRouter = express.Router();
const {
    getAllFromDatabase,
    deleteAllFromDatabase,
    createMeeting,
    addToDatabase
    } = require('./db');


meetingsRouter.get('/', (req, res, next) => {
    const allMeetings = getAllFromDatabase('meetings');
    if (allMeetings) {
        res.send(allMeetings);
    }
});

meetingsRouter.post('/', (req, res, next) => {
    let newMeeting = createMeeting();
    if (newMeeting) {
        addToDatabase('meetings', newMeeting);
        res.status(201).send(newMeeting);
    }
})

meetingsRouter.delete('/', (req, res, next) => {
    let meetingsDeleted = deleteAllFromDatabase('meetings');
    if (meetingsDeleted) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
})


module.exports = meetingsRouter;