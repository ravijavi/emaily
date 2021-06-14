//could also name this file stripe payments or something equivalent
//will make our own react component in this file
import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
       // debugger;

        return (
            <StripeCheckout
            name="Emaily"
            description="$5 for 5 email credits" 
            amount={500} //when we see amount, typically think of your respective currency, need to tell Stripe what denomination and currency we are talking about, Stripe defaults to USD
            token={token => this.props.handleToken(token)} //callback property waiting for Stripe transaction token
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn"> 
                    Add Credits
                </button>
                </StripeCheckout>
                //pass an element to stripe checkout component as a child component
        );
    }
}

export default connect(null, actions) (Payments);