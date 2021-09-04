import {
    FETCH_GAMES_REQUEST,
    FETCH_GAMES_SUCCESS,
    FETCH_GAMES_FAILURE
} from '../action-types';

const initialState = {
    isLoading: true,
    isError: false,
    gameList: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_GAMES_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case FETCH_GAMES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                gameList: action.data
            };
        case FETCH_GAMES_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
}
