const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {
//going to take a POST req to api/surveys
app.post('/api/surveys', requireLogin, requireCredits, (req,res) => {
    //make sure you're logged in and that you have enough credits to send bulk email
    //all info in the request is in the BODY
    const { title, subject, body, recipients } = req.body; //how we will design our back end server, assuming we will pass in all of these properties

    const survey = new Survey({
        //recipients is a sub-document collection
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => ({ email })), //defining a shortened object here, so enclose email with paren's after arrow function
        //split by comma, turn recipients into array of strings. For each string in that array, we will map over it. Map function takes every email in the array, performs an operation on it, then will return a new object that has an email property of 'email' (points at the user's email)
        _user: req.user.id, //a property available to us on any Mongoose model
        dateSent: Date.now()
    });

});

};