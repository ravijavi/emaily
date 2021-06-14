import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
        //inpsect this.auth.props property, will spit out specific blob of text for the user
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            default: //if not null or false, they must be logged in
                return [
                <li key="1"><Payments /></li>,
                <li key="2"><a href="/api/logout">Logout</a></li>
                ];
        }
    }
    render() {
        console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                    to={this.props.auth ? '/surveys' : '/'} 
                    className="left-brand-logo"
                    >
                        Emaily 
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
    //right now, we only care about the auth piece of state
}

export default connect(mapStateToProps)(Header);