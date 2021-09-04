import {
    FETCH_USER_INFO_REQUEST,
    FETCH_USER_INFO_SUCCESS,
    FETCH_USER_INFO_FAILURE
} from './action-types';

const initialState = {
    isLoading: false,
    isError: false,
    info: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_INFO_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case FETCH_USER_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                info: action.data
            };
        case FETCH_USER_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
}
