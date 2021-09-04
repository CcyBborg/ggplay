import * as API from './api';
import {
    SIGN_IN_USER_REQUEST,
    SIGN_IN_USER_SUCCESS,
    SIGN_IN_USER_FAILURE
} from './action-types';

export function signInUser(params) {
    return async dispatch => {
        dispatch({
            type: SIGN_IN_USER_REQUEST
        });

        try {
            const res = await API.signInUser(params);

            dispatch({
                type: SIGN_IN_USER_SUCCESS,
                data: res.data
            });
        } catch (err) {
            dispatch({
                type: SIGN_IN_USER_FAILURE,
                error: err.response.data.error
            });
        }
    };
}
