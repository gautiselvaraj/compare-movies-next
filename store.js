import { fromJS, Iterable } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import combainedReducers from './reducers';

let middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');

  const logger = createLogger({
    collapsed: true,
    stateTransformer: state =>
      Iterable.isIterable(state) ? state.toJS() : state
  });

  middlewares.push(logger);
}

export default (initialState = {}) => {
  if (!Iterable.isIterable(initialState)) {
    initialState = fromJS(initialState);
  }
  return createStore(
    combainedReducers,
    initialState,
    applyMiddleware(...middlewares)
  );
};
