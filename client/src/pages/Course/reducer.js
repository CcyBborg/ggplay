import {
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAILURE
} from './action-types';

const initialState = {
    isLoading: false,
    isFalse: false,
    comments: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COMMENTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                comments: null
            };
        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                comments: action.data
            };
        case FETCH_COMMENTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
}

