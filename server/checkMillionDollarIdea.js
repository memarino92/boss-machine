const checkMillionDollarIdea = (req, res, next) => {
    let newIdea = req.body;
    if (newIdea.numWeeks*newIdea.weeklyRevenue >= 1000000) {
        next()
    } else {
        res.status(400).send()
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
