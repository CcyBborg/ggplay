import {
    COURSE_ORDER_REQUEST,
    COURSE_ORDER_SUCCESS,
    COURSE_ORDER_FAILURE
} from './action-types';

const initialState = {
    isLoading: false,
    isError: false,
    paymentUrl: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case COURSE_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case COURSE_ORDER_SUCCESS:
            return {
                ...state,
                paymentUrl: action.data.url
            };
        case COURSE_ORDER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
}
