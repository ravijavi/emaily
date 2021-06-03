import axios from 'axios';
import { FETCH_USER } from './types';


//will declare action types in a different file
//below is the normal way to implement, the block after that is an optimized refactor with aysnc/await functionality, now have more compact syntax
/*
export const fetchUser = () => {
    return function(dispatch) {
        axios.get('/api/current_user')
        .then(res => dispatch({ type: FETCH_USER, payload: res })); //only putting relative path to our backend server, in dev, make use of our proxy to forward request on to api, then proxy will send a request back to the React application, in PROD, we do not need the proxy at all
        //we want to dispatch an action after this API request has been completed
    };
    
};
*/

export const fetchUser = () => async dispatch => {
    //will use async/await syntax by making the promise statement async
    //mark promise statements with await keyword
    const res = await axios.get('./api/current_user')
    dispatch({ type: FETCH_USER, payload: res.data });
    //added res.data because that is the only info we actually care about
};
    //currently one expression, therefore we can remove curly braces and return keyword

    //instead of function keyword, will just use arrow function instead
    //don't need parentheses around dispatch since there is only one function