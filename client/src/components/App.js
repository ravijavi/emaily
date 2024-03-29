import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; //3 distinct router libraries (react-router-dom, react router native, react router core)
//BrowserRouter = looks at current url and changes set of components visible
//Route = sets up rule between a route user visits and the components visible on the screen
import { connect } from 'react-redux';
import * as actions from '../actions'; //assign all actions we have created to the actions object
import Landing from './Landing';
import Header from './Header';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

//const SurveyNew = () => <h2>SurveyNew</h2>; replacing dummy component
//const Landing = () => <h2>Landing</h2>; replacing the dummy landing component

class App extends Component {
    componentDidMount() {
        //See if our current user is logged in
        this.props.fetchUser();
    }
    render() {
    return (
        <BrowserRouter>
        <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
        </div>
        </BrowserRouter>
    );
}
};

export default connect(null, actions) (App);