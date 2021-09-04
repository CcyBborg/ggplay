import {
    FETCH_COACHES_REQUEST,
    FETCH_COACHES_SUCCESS,
    FETCH_COACHES_FAILURE
} from '../action-types';

const initialState = {
    isLoading: true,
    isError: false,
    coachList: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COACHES_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case FETCH_COACHES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                coachList: action.data
            };
        case FETCH_COACHES_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
}
