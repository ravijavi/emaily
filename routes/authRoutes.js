const passport = require('passport');

//do not define app in this file, we define it into the authRoutes.js file, need to import it, create a new arrow function and export
module.exports = app => { //now exporting a function from this file, will call with express app object
app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'] //asking for user's profile and email info, Google has internal keywords for attributes of Google user's account
    }) //many different scopes you can request in the OAuth process
  );

  app.get('/auth/google/callback', passport.authenticate('google'),
  (req, res) => {
    //whenever a req comes to this function, we want to pass this off to another route (where should we send them inside our app after Google authentication?)
    res.redirect('/surveys');
  }
  ); //resolves incoming request into a new profile --> no logic needed on our end, Google strategy handles it
  //*above refactored from index.js*

  app.get('/api/logout', (req,res) => {
    req.logout();
   // res.send(req.user); //sign out of app by using logout function from passport, editing this out bc was using for testing, but useless for logout because nobody is logged in and you won't get anything from req.user
   res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  }); //going to make a request to verify whether or not user is logged into the application
};
