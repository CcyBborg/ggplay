import {
    FETCH_COACH_REQUEST,
    FETCH_COACH_SUCCESS,
    FETCH_COACH_FAILURE,

    PAY_SLOT_SUCCESS
} from './action-types';

const initialState = {
    isLoading: true,
    isError: false,
    coach: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COACH_REQUEST:
            return {
                ...state,
                isError: false,
                isLoading: true
            };
        case FETCH_COACH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                coach: action.data
            };
        case PAY_SLOT_SUCCESS:
            console.log(action.data);
            return {
                ...state,
                paymentUrl: action.data.url
            };
        case FETCH_COACH_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
}
