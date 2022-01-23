import * as API from './api';
import {
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAILURE,

    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE
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

export function addComment(params) {
    return async dispatch => {
        dispatch({
            type: ADD_COMMENT_REQUEST
        });

        try {
            const res = await API.addComment(params);

            dispatch({
                type: ADD_COMMENT_SUCCESS,
                data: res.data
            });
        } catch (err) {
            dispatch({
                type: ADD_COMMENT_FAILURE
            });
        }
    };
}
