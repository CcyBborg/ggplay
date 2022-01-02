import * as API from './api';
import {
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE
} from './action-types';

export function logout() {
    return async dispatch => {
        dispatch({
            type: LOGOUT_USER_REQUEST
        });

        try {
            await API.logout();

            dispatch({
                type: LOGOUT_USER_SUCCESS
            });
        } catch (err) {
            dispatch({
                type: LOGOUT_USER_FAILURE
            });
        }
    };
}
