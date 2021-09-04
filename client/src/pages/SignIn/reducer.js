import {
    SIGN_IN_USER_REQUEST,
    SIGN_IN_USER_SUCCESS,
    SIGN_IN_USER_FAILURE
} from './action-types';

const initialState = {
    isLoading: false,
    isUserSignedIn: false,
    error: null,
    token: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SIGN_IN_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case SIGN_IN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isUserSignedIn: true
            };
        case SIGN_IN_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state;
    }
}
