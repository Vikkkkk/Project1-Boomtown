import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import shareItemReducer from './modules/ShareItemPreview';

//this page is a combination of the reducers and store page 
// @TODO: Import your reducers

const middleware = [];

export default combineReducers({
  counter: counterReducer,
  name: nameReducer
});


const store = createStore(
  /* @TODO: Combine your reducers */
  combineReducers({
    shareItemPreview:shareItemReducer
  }),
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
