import * as API from './api';
import {
    FETCH_GAMES_REQUEST,
    FETCH_GAMES_SUCCESS,
    FETCH_GAMES_FAILURE,

    FETCH_COACHES_REQUEST,
    FETCH_COACHES_SUCCESS,
    FETCH_COACHES_FAILURE
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

export function fetchCoaches(params) {
    return async dispatch => {
        dispatch({
            type: FETCH_COACHES_REQUEST
        });

        try {
            const res = await API.fetchCoaches(params);

            dispatch({
                type: FETCH_COACHES_SUCCESS,
                data: res.data
            });
        } catch (err) {
            dispatch({
                type: FETCH_COACHES_FAILURE
            });
        }
    };
}
