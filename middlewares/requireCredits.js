module.exports = (req, res, next) => {
    //a middleware is a function and takes the incoming request and modifies it inside of a function such as this
    //next is a funciton we call when the middleware is complete, similar to a done callback

    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'Not enough credits!' });
    }

    next();
}