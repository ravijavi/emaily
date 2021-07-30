import React, { Component } from 'react';
//SurveyForm shows a form for a user to add input
import { reduxForm } from 'redux-form';

class SurveyForm extends Component {
    render() {
        return (
            <div>
                SurveyForm!
            </div>
        );
    }
}

export default reduxForm({
    //empty javascript object, going to put in form property and come back to it later
    form: 'surveyForm'
}) (SurveyForm);