import {
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS
} from './action-types';

const initialState = {
    isLoading: false,
    isFalse: false,
    comments: null,
    isAddingComment: false
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
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                isAddingComment: true,
            };
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                isAddingComment: false,
                comments: [
                    action.data,
                    ...state.comments
                ]
            };
        default:
            return state;
    }
}

