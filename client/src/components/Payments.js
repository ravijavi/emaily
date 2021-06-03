//could also name this file stripe payments or something equivalent
//will make our own react component in this file
import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
    render() {
        debugger;

        return (
            <StripeCheckout 
            amount={500} //when we see amount, typically think of your respective currency, need to tell Stripe what denomination and currency we are talking about, Stripe defaults to USD
            token={token => console.log(token)} //callback property waiting for Stripe transaction token
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            />
        );
    }
}

export default Payments;