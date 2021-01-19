import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/rootReducer";


// export const store = createStore( rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

// Como vamos a usar el Middleware thunk para el login necesitamos esta constante

const composeEnhancers = ( typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) || compose;

export const store = createStore( rootReducer, composeEnhancers( applyMiddleware( thunk ) ) );
