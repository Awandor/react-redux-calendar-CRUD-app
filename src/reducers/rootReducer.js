import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./uiReducer";


// combineReducers es una función que agrupa varios reducers que luego enchufamos a createStore

export const rootReducer = combineReducers( { ui: uiReducer, calendar: calendarReducer, auth: authReducer } );
