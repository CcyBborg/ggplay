import {
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS
} from './action-types';

const initialState = {
    isLoggedOut: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                isLoggedOut: true
            };
        default:
            return state;
    }
}
