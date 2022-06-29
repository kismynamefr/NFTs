import { FETCH_MARKET_ITEM, FETCH_MARKET_SUCCESS, FETCH_MARKET_ERROR } from "../constants/constantsFetch";

const initialState = {
    requesting: false,
    success: false,
    message: null,
    data: null
}

const fetchReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case FETCH_MARKET_ITEM:

            return {
                ...state,
                requesting: true
            };
        case FETCH_MARKET_SUCCESS:

            return {
                ...state,
                requesting: false,
                success: true,
                data: payload.data
            };
        case FETCH_MARKET_ERROR:

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

export default fetchReducer;