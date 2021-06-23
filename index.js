const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');

/*const passportConfig = */ require('./services/passport'); //don't need to make this an obj
//const authRoutes = require('./routes/authRoutes'); //function that takes our app obj and uses it here
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

//create new express app
//create first route handler
//require lets us access the express library
//will use common js modules on the server side
//want to share code between different files, hence why I am using this particular import syntax
//uses ES2015 to implement this flavor of import modules
const app = express();
//may have multiple applications in any given product/project
app.use(bodyParser.json()); //this middleware will parse the body and assign it to the req.body property of the incoming request object
app.use(
    cookieSession({
        maxAge: 30 * 24* 60 *60 * 1000, //'maxAge' is measured in milliseconds
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

//authRoutes(app); --> this is one way to do it, below is a more concise way to handle authRoutes
require('./routes/authRoutes')(app); //when we require the authRoutes file, it returns a function
require('./routes/billingRoutes')(app); //both of these return/export a function, we call it with the express app object in the 2nd paren's


//make sure Express behaves correctly when in production
if (process.env.NODE_ENV === 'production') {
    //only going to run if in Heroku production
    //Express will serve up production assets like our main.js file, or main.css file
    app.use(express.static('client/build')); //if any get request comes in and we don't understand what it is for, then look into client/build directory to find a match
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    }); //serve up html document since we assume React router will handle it

    //Express will serve up the index.html file if it doesn't recognize the route
}

//tell express to involve passport and enter user into passport function to get them into OAuth flow
//create new instance of the google passport strategy. Will put configurations in GoogleStrategy parameter field
//4;
// app.get('/', (req, res) => {
//   res.send({ bye: 'buddy' });
// }); //this code snippet is a simple example of a route handler


const PORT = process.env.PORT || 5000; //whenever Heroku runs our app, can inject environment variables, Heroku's opportunity to pass on runtime configurations
//go ahead and assign var to port, otherwise, just use 5000. In production, will use whatever Heroku provides for us
app.listen(PORT);

/*
bare basics of an express server; even with this small amount of code,
I would be able to deploy my website. My favorite free deployment app
is Heroku, also lets you deploy something without even having to enter
in personal CC data.
*/

/*
TODO: go back later refactor the components of this file into multiple files
*/
