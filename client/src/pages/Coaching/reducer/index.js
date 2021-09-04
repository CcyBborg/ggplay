import { combineReducers } from 'redux';
import games from './games';
import coaches from './coaches';

export default combineReducers({
    games,
    coaches
});
