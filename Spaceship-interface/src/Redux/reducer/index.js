import { combineReducers } from "redux";
import fetchHistory from "./fetchHistory";
import fetchReducer from "./fetchReducer";

const reducers = combineReducers({
    fetchs: fetchReducer,
    histories: fetchHistory
});

export default (state, action) => reducers(state, action);