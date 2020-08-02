const express = require('express');
const minionsRouter = express.Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
    } = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    let minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minionId = id;
        req.minion = minion;
        next();
    } else {
        res.status(404).send('Invalid ID')
    }
});

minionsRouter.get('/', (req, res, next) => {
    const allMinions = getAllFromDatabase('minions');
    if (allMinions) {
        res.send(allMinions);
    }
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    let newMinion = updateInstanceInDatabase('minions', req.body);
    if (newMinion) {
        res.send(newMinion);
    }
});

minionsRouter.post('/', (req, res, next) => {
    let newMinion = addToDatabase('minions', req.body);
    if (newMinion) {
        res.status(201).send(newMinion);
    }
})

minionsRouter.delete('/:minionId', (req, res, next) => {
    let minionDeleted = deleteFromDatabasebyId('minions', req.minionId);
    if (minionDeleted) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
})


module.exports = minionsRouter;