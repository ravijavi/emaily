/*
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
*/
const mongoose = require('mongoose');
const { Schema }  = mongoose; //this statement is equivalent to the 2 lines above
//mongoose object has a property called schema, take that property and assign it to a new variable called 'schema'
//this is a prime example of destructuring

const userSchema = new Schema({ //define required props in each record
    googleId: String,
    credits: { type: Number, default: 0 } //need to default the credits to 0, need to pay us first! Can use an object to ensure that we specify the credits is an integer as well as specifying the default value. Check out mongoose docs to see what other kinds of specifications you can make to a given property
});
//can freely add or subtract properties as needed

//create model class and prompt mongoose to create a new collection

mongoose.model('users', userSchema); //model command will create new collection called 'users', as an example to the rule above
//mongoose will not overwrite existing collections