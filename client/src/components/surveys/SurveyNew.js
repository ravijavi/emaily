//need a class based component here
//want to toggle between our two forms here

//SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    //first time in project that I will be using component level state, instead of writing the constructor, we can use Babbel to do it for us a bit differently
    // constructor(props) {
    //     super(props);

    //     this.state = { new: true };
    // }

    state = { showFormReview: false }; //this statement and the above code block are 100% equivalent

    renderContent() {
        if (this.state.showFormReview === true) {
            return <SurveyFormReview 
            onCancel={() => this.setState({ showFormReview: false })}
            />;
        }
        return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })}/>
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default SurveyNew;