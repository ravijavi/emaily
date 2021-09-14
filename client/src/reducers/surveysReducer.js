import { FETCH_SURVEYS } from "../actions/types";

export default function(state = [], action) {
    //since reducer is always giving back list of surveys, will return empty array
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload;
        default:
            return state;
    }
}