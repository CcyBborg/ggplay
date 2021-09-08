import * as API from './api';
import {
    FETCH_SLOTS_REQUEST,
    FETCH_SLOTS_SUCCESS,
    FETCH_SLOTS_FAILURE
} from './action-types';

export function fetchSlots() {
    return async dispatch => {
        dispatch({
            type: FETCH_SLOTS_REQUEST
        });

        try {
            const res = await API.fetchSlots();

            dispatch({
                type: FETCH_SLOTS_SUCCESS,
                data: res.data
            });
        } catch (err) {
            dispatch({
                type: FETCH_SLOTS_FAILURE
            });
        }
    };
}
