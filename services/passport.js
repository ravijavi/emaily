const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; //will help instruct exactly how to authenticate users with Google OAuth
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
//one parameter means we want to fetch something from Mongo, two means we want to load something into mongo

passport.serializeUser((user, done) => { //'user' in this param is user obj that was just pulled out of the database
done(null, user.id); //'done' is a callback we call after we have nudged the passport flow along, user.id is the object we will leverage in future requests

});

passport.deserializeUser((id, done) => { //'id' is whatever was stuffed into the cookie
  //turn an id into a Mongoose Model id instance
  User.findById(id) //pass in id of the record we want to find into 'findById' fxn
  .then(user => {
    done(null, user);
  }); 
});

passport.use(
    new GoogleStrategy( //has an internal identifier of google, so passport knows to refer to this block of code
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback', //add logic to handle user coming back from OAuth flow
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id })
          if (existingUser) {
            //we already have a record with the given profile id
            return done(null, existingUser);
          } 
            //we don't have auser record with this id, make a new record
            const user = await new User({ googleId: profile.id}).save() //'id' is the one coming from user's google profile
            done(null,user);
            //when using save fxn, take this record/model instance and save it to the database for us
          
        //initiate a search within collection in MongoDB, this line does return a user directly, however
        //this will return a promise for us

        //paren's are the 2nd paramter of this function
       

        /*
        console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile:', profile);
        */
      }
    )
  );
//*above refactored from index.js*  

//npx create-react-app client

