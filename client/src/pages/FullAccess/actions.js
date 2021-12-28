import * as API from './api';
import {
    COURSE_ORDER_REQUEST,
    COURSE_ORDER_SUCCESS,
    COURSE_ORDER_FAILURE,
} from './action-types';


export function orderCourse(slotId) {
    return async dispatch => {
        dispatch({
            type: COURSE_ORDER_REQUEST,
        });

        try {
            const res = await API.orderCourse(slotId);

            dispatch({
                type: COURSE_ORDER_SUCCESS,
                data: res.data
            });
        } catch (err) {
            dispatch({
                type: COURSE_ORDER_FAILURE
            });
        }
    };
}
