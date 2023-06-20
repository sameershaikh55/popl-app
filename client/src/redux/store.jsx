import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// REDUCERS
import {
  userReducer,
  resetPasswordReducer,
  forgotPasswordReducer,
} from "./reducer/auth";
import { cardReducer } from "./reducer/card";
// import { users } from "./reducer/users";
// import { supplies } from "./reducer/supplies";

const reducer = combineReducers({
  user: userReducer,
  resetPassword: resetPasswordReducer,
  forgetPassword: forgotPasswordReducer,
  card: cardReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
