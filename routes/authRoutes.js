const passport = require('passport');

//do not define app in this file, we define it into the authRoutes.js file, need to import it, create a new arrow function and export
module.exports = app => { //now exporting a function from this file, will call with express app object
app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'] //asking for user's profile and email info, Google has internal keywords for attributes of Google user's account
    }) //many different scopes you can request in the OAuth process
  );

  app.get('/auth/google/callback', passport.authenticate('google')); //resolves incoming request into a new profile --> no logic needed on our end, Google strategy handles it
  //*above refactored from index.js*

  app.get('/api/logout', (req,res) => {
    req.logout();
    res.send(req.user); //sign out of app by using logout function from passport
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
