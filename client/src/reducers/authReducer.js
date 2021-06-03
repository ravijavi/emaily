import { FECTH_USER, FETCH_USER } from '../actions/types';



export default function(state = null, action) { //state by default is undefined, as shown in first argument
    //by writing null, we make sure that by default, we assume user is not logged in
    switch (action.type) {
        case FETCH_USER:
        return action.payload || false; //either an object or an empty string, we want to empty string to return false, '' in JS is interpreted as a false value
        default:
            //assume no change in state is necessary
            return state;
    }
}