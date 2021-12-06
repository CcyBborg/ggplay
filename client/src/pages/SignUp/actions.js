import * as API from './api';
import {
    FETCH_GAMES_REQUEST,
    FETCH_GAMES_SUCCESS,
    FETCH_GAMES_FAILURE,

    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE
} from './action-types';

export function fetchGames() {
    return async dispatch => {
        dispatch({
            type: FETCH_GAMES_REQUEST
        });

        try {
            const res = await API.fetchGames();

            dispatch({
                type: FETCH_GAMES_SUCCESS,
                data: res.data
            });
        } catch (err) {
            dispatch({
                type: FETCH_GAMES_FAILURE
            });
        }
    };
}

export function createUser(params) {
    return async dispatch => {
        dispatch({
            type: CREATE_USER_REQUEST
        });

        try {
            await API.createUser(params);
            const res = await API.signInUser(params);

            dispatch({
                type: CREATE_USER_SUCCESS,
                data: res.data
            });
        } catch (err) {
            dispatch({
                type: CREATE_USER_FAILURE,
                error: err.response.data.error
            });
        }
    };
}
