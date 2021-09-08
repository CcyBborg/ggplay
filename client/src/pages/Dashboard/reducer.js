import {
    FETCH_SLOTS_REQUEST,
    FETCH_SLOTS_SUCCESS,
    FETCH_SLOTS_FAILURE
} from './action-types';

const initialState = {
    isLoading: true,
    isError: false,
    slots: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SLOTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case FETCH_SLOTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                slots: action.data.slots
            };
        case FETCH_SLOTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
}
