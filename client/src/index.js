import 'materialize-css/dist/css/materialize.min.css'; //when importing non js files, we need to add the file extension to make sure Webpack knows it is not a js file
//do not need a relative path to import this bc of webpack, now it is just "import this css file"
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import reduxThunk from 'redux-thunk';


import App from './components/App';
import reducers from './reducers';
//action creators used to modify the state that is contained in the redux store


const store = createStore(reducers, {}, applyMiddleware(reduxThunk)); //second arg important for server side rendering

//this is the root file of our application, specifically for the front end

//ReactDOm expects a component instance in the first argument
ReactDOM.render(
<Provider store={store}><App /></Provider>, //provider lets all child components of app that a new state is available
    document.querySelector('#root')); //connects us to index.html file where 'root' is written (in the Public folder)

    // console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
    // console.log('Environment is', process.env.NODE_ENV);
    //want to ensure that these .env files are visible when running the project