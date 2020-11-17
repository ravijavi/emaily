/*
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
*/
const mongoose = require('mongoose');
const { Schema }  = mongoose; //this statement is equivalent to the 2 lines above
//mongoose object has a property called schema, take that property and assign it to a new variable called 'schema'
//this is a prime example of destructuring

const userSchema = new Schema({ //define required props in each record
    googleId: String
});
//can freely add or subtract properties as needed

//create model class and prompt mongoose to create a new collection

mongoose.model('users', userSchema); //model command will create new collection called 'users', as an example to the rule above
//mongoose will not overwrite existing collections