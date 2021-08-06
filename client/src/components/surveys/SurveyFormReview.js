//SurveyFormReview shows users their form inputs for review
//presentational type of component
import React from 'react';
import { connect } from 'react-redux';

const SurveyReview = ({ onCancel, formValues }) => {
    return (
        <div>
            <h5>Please confirm your entries</h5>
            <div>
            </div>
            <button 
            className="yellow darken-3 btn-flat"
            onClick={onCancel}
            >
            Back
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    //by convention, call this mapStateToProps -> move state down to our component
    console.log(state); //want to see what the state will look like
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps)(SurveyReview);