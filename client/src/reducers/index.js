//combine with combineReducers call, then export from this file
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers ({
    auth: authReducer,
    //auth piece of state is being produced by the authReducer
    form: reduxForm, //do this b/c we assume that this is where all the state will be living
    surveys: surveysReducer
});