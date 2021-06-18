const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        //here is where we will put logic to handle token and reach out to Stripe and finalize charge/update credits
        //console.log(req.body);
        //put together post req handler to deal with charges
        //will see all info in request object in the dev tools --> request payload

        const charge = await stripe.charges.create({ //will return an obj that represents the charge that just occurred
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits', //works as a simple logging statement
            source: req.body.id //will use id property that could be seen in console.log statement of req.body
        });
        //console.log(charge);

        req.user.credits += 5; //add credits
       const user = await req.user.save(); //save user, whenever we use save, it is an asynchronous request, which is why we put await keyword

       res.send(user);
    });
};