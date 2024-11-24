import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";


const rootReducers=combineReducers({

      auth:authReducer,
  
  
  });


export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))