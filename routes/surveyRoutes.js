const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
    });
    //going to take a POST req to api/surveys
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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

        //Great place to send an email!
        const mailer = new Mailer(survey, surveyTemplate(survey)); //will pass in entire survey object

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            await req.user.save(); //can now consider this 'user' to be 'stale'
            //will eventually be resolved with our user

            res.send(user); //specifically indicate that this is the new total of credits
        } catch (err) {
            res.status(422).send(err); //means unprocessable entity
        }


    });

};