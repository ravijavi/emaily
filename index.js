//create new express app
//create first route handler
const express = require('express');
//require lets us access the express library
//will use common js modules on the server side
//want to share code between different files, hence why I am using this particular import syntax
//uses ES2015 to implement this flavor of import modules
const app = express();
//may have multiple applications in any given product/project

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
}); //this code snippet is a simple example of a route handler

const PORT = process.env.PORT || 5000; //whenever Heroku runs our app, can inject environment variables, Heroku's opportunity to pass on runtime configurations
//go ahead and assign var to port, otherwise, just use 5000. In production, will use whatever Heroku provides for us
app.listen(PORT);

/*
bare basics of an express server; even with this small amount of code,
I would be able to deploy my website. My favorite free deployment app
is Heroku, also lets you deploy something without even having to enter
in personal CC data.
*/
