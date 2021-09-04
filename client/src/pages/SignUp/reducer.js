import {
    FETCH_GAMES_REQUEST,
    FETCH_GAMES_SUCCESS,
    FETCH_GAMES_FAILURE,

    FETCH_RANKS_REQUEST,
    FETCH_RANKS_SUCCESS,
    FETCH_RANKS_FAILURE,

    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE
} from './action-types';

const initialState = {
    isLoading: true,
    isUserSignedIn: false,
    error: null,
    gameList: null,
    rankList: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_GAMES_REQUEST:
        case FETCH_RANKS_REQUEST:
        case CREATE_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case FETCH_GAMES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                gameList: action.data
            };
        case FETCH_RANKS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                rankList: action.data
            };
        case FETCH_GAMES_FAILURE:
        case FETCH_RANKS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true
            };
        case CREATE_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isUserSignedIn: true,
            };
        default:
            return state;
    }
}
