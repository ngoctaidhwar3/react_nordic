import thunk from 'redux-thunk';
import logger from 'redux-logger';
const { createStore, compose, applyMiddleware } = require("redux");
const { default: reducer } = require("./reducer");
const middleware = [logger,thunk];
const enhancer = compose(applyMiddleware(...middleware));
const store = createStore(reducer,enhancer);

export default store;
