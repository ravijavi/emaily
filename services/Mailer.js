//view email as another service of the application
//Mailer has a capital M because it exports a class
//however, passport.js doesn't export anything, hence why it's lowercase

const { response } = require('express');
const sendgrid = require('sendgrid');
const helper = sendgrid.mail; //helper obj that helps us create the mailer
const keys = require('../config/keys');

//setting up our mailer class
class Mailer extends helper.Mail {
    //helper.Mail takes a lot of configuration and spits out a mailer

    //can treat this just like a normal React component
    constructor({ subject, recipients }, content) {
        //called automatically when you use the keyword like this
        //any args we use will be provided as args to the constructor
        super(); //ES2015 class convention

        this.sgApi = sendgrid(keys.sendGridKey);

        this.from_email = new helper.Email('jain.ravi654@gmail.com'); //what I put down as the Sender
        this.subject = subject;
        this.body = new helper.Content('text/html', content);

        //list of recipients
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body); //a function from the Mail base class, a built-in function, expects you to use the body of the email as the parameter
        this.addClickTracking();
        this.addRecipients(); //TODO

    }

    formatAddresses(recipients) {
        //iterate thru list of recipients, then extract just their email and return it
        return recipients.map(({ email }) => { //need parens to do destructuring with an arrow function
            return new helper.Email(email);

        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings); //very painful to write, but this is basically what you have to do for Sendgrid, docs basically say to just write this code
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize); //add entire personalized object to the mailer
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON() //defined by the mail base class
        });

        const response = await this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;