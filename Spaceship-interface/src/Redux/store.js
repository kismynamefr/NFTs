import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducers from './reducer/index';

const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
}

const stores = createStore(
    reducers,
    applyMiddleware(...middlewares)
)
export default stores;