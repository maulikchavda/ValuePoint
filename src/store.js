import { createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/Reducer/index";
import {composeWithDevTools} from 'redux-devtools-extension'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

const myStore = createStore(
  rootReducer,
  composedEnhancer
);

export default myStore;
