const mongoose = require('mongoose');
const { Schema } = mongoose;

//initial setup of this file will mirror other model files
//clicked will be a boolean object to see if link had been clicked previously

const recipientSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    responded: { type: Boolean, default: false }
}); //our initial definition of what our sub-document looks like

module.exports = recipientSchema;
//now we know what a recipient looks like