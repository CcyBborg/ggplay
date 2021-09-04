import * as API from './api';
import {
    FETCH_COACH_REQUEST,
    FETCH_COACH_SUCCESS,
    FETCH_COACH_FAILURE,

    BOOK_SLOT_REQUEST,
    BOOK_SLOT_SUCCESS,
    BOOK_SLOT_FAILURE
} from './action-types';

export function fetchCoach(id) {
    return async dispatch => {
        dispatch({
            type: FETCH_COACH_REQUEST
        });

        try {
            const res = await API.fetchCoach(id);

            dispatch({
                type: FETCH_COACH_SUCCESS,
                data: res.data
            });
        } catch (err) {
            dispatch({
                type: FETCH_COACH_FAILURE
            });
        }
    };
}

export function bookSlot(slotId) {
    return async dispatch => {
        dispatch({
            type: BOOK_SLOT_REQUEST,
        });

        try {
            const res = await API.bookSlot(slotId);

            dispatch({
                type: BOOK_SLOT_SUCCESS,
                data: res.data
            });
        } catch (err) {
            dispatch({
                type: BOOK_SLOT_FAILURE
            });
        }
    };
}
