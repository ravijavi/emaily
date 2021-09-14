const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        //pull out all the different surveys that were created by the user
        const surveys = await Survey.find({ _user: req.user.id })
        .select({ recipients: false }); //async query so we use await

        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        // console.log(req.body);
        // res.send({}); //send back empty object to sendgrid
        const p = new Path('/api/surveys/:surveyId/:choice'); //path object that we can use to look at pathname and extract out surveyId and a choice
        _.chain(req.body)
        .map(({ email, url }) => {
            //only getting route with url helper
            //take full url and just extract route
            const match = p.test(new URL(url).pathname); //match will either be an object or it will be null
            if (match) {
                 return { email, surveyId: match.surveyId, choice: match.choice }; // how it would be written with ES6 destructuring --> destructured email and url at the top
            }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({ surveyId, email, choice }) => {
            Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $elemMatch: { email: email, responded: false }
                }
            }, {
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.responded': true },
                lastResponded: new Date()
            }).exec(); //short for .execute, need to execute our query
        })
        .value(); //ensure no duplicates of these two values in the array
        //return only objects that are not undefined in the array
       //console.log(events); --> when chain was assigned to a variable events

       res.send({});
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
            const user = await req.user.save(); //can now consider this 'user' to be 'stale'
            //will eventually be resolved with our user

            res.send(user); //specifically indicate that this is the new total of credits
        } catch (err) {
            res.status(422).send(err); //means unprocessable entity
        }


    });

};