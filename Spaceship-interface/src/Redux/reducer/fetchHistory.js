import { FETCH_HISTORY_ITEM, FETCH_HISTORY_SUCCESS, FETCH_HISTORY_ERROR } from '../constants/constantsFetchHistory';

const initialState = {
    requesting: false,
    success: false,
    message: null,
    data: null
}

const fetchHistory = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_HISTORY_ITEM:

            return {
                ...state,
                requesting: true
            };
        case FETCH_HISTORY_SUCCESS:

            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data
            };
        case FETCH_HISTORY_ERROR:

            return {
                ...state,
                requesting: false,
                success: false,
                message: payload.message
            };
        default:
            return state;
    }
}

export default fetchHistory;