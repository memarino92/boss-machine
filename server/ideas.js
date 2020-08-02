const express = require('express');
const ideasRouter = express.Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    } = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
    let idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.ideaId = id;
        req.idea = idea;
        next();
    } else {
        res.status(404).send('Invalid ID')
    }
});

ideasRouter.get('/', (req, res, next) => {
    const allIdeas = getAllFromDatabase('ideas');
    if (allIdeas) {
        res.send(allIdeas);
    }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    let newIdea = updateInstanceInDatabase('ideas', req.body);
    if (newIdea) {
        res.send(newIdea);
    }
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    let newIdea = addToDatabase('ideas', req.body);
    if (newIdea) {
        res.status(201).send(newIdea);
    }
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
    let ideaDeleted = deleteFromDatabasebyId('ideas', req.ideaId);
    if (ideaDeleted) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
})


module.exports = ideasRouter;