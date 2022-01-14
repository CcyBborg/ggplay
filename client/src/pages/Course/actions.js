import * as API from './api';
import {
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAILURE
} from './action-types';

export function fetchComments(lessonId) {
    return async dispatch => {
        dispatch({
            type: FETCH_COMMENTS_REQUEST
        });

        try {
            const res = await API.fetchComments(lessonId);

            dispatch({
                type: FETCH_COMMENTS_SUCCESS,
                data: res.data
            });
        } catch (err) {
            dispatch({
                type: FETCH_COMMENTS_FAILURE
            });
        }
    };
}
