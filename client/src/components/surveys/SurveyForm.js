import _ from 'lodash';
import React, { Component } from 'react';
//SurveyForm shows a form for a user to add input
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                {this.renderFields()}
                <Link to="/surveys" className="red btn-flat white-text">
                    Cancel
                </Link>
                <button type="submit" className="teal btn-flat right white-text">Next
                <i className="material-icons right">done</i>
                </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    //values is all the things that are coming off of our form
    //api is easy in practice, but conceptually difficult
    const errors = {}; //if obj is empty, then we know there is no issue with the emails
    
    errors.emails = validateEmails(values.emails || '');

    _.each(formFields, ({ name }) => {
        //using lodash library to iterate over FIELDS
        if (!values[name]) {
            //this is how you can reference a property on an object on the fly, use square brackets
            errors[name] = 'You must provide a value';
        }
    });


    return errors;
    /*
    if (!values.title) {
        errors.title = 'You must provide a title'; //write a validation based on the object and send back string to the user
        
    }
    if (!values.subject) {
        errors.subject = 'You must provide a subject';
    }
    if (!values.body) {
        errors.body = 'You must provide a body';
    }
    *This is all repetitive logic, therefore I will write an improved validate function instead
    */



}

export default reduxForm({
    //empty javascript object, going to put in form property and come back to it later. The form property allows me to a namespace to refer to in our confirm page.
    //this feature can make it very easy to make a wizard form with multiple pages.
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false //dont dump the values until I say so
}) (SurveyForm);

/*
<Field 
type="text"
name="surveyTitle"
component="input"
/>

sample of a field tag that I had made intitially for proof of concept
*/