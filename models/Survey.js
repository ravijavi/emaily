const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    //recipients: [String], will change this to conform to the recipients schema instead of this initial object declaration
    recipients: [RecipientSchema], //now it is an array of RecipientSchema objects, this is how we create a sub-document collection
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date,
    lastResponded: Date //not necessary to making our app work, but adds nice feature for our users
});

mongoose.model('surveys', surveySchema);