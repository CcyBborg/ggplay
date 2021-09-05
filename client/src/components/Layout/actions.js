import * as API from './api';
import {
    FETCH_USER_INFO_REQUEST,
    FETCH_USER_INFO_SUCCESS,
    FETCH_USER_INFO_FAILURE
} from './action-types';

export function fetchUserInfo() {
    return async dispatch => {
        dispatch({
            type: FETCH_USER_INFO_REQUEST
        });

        try {
            const res = await API.fetchUserInfo();

            dispatch({
                type: FETCH_USER_INFO_SUCCESS,
                data: res.data
            });
        } catch (err) {
            dispatch({
                type: FETCH_USER_INFO_FAILURE,
            });
        }
    };
}
