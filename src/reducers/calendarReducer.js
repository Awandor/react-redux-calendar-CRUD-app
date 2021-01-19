import { types } from "../types/types";

/* {
  id: new Date().getTime(),
  title: 'Cumpleaños de Alguien',
  start: moment().toDate(),
  end: moment().add( 2, 'hours' ).toDate(),

  // bgcolor: 'tomato',
  user: {
    _id: '123',
    name: 'Dan'
  }
}  */

const initialState = {
  events: [],
  activeEvent: null
};

// Es importante que el state no sea undefined por ello lo inicializamos

export const calendarReducer = ( state = initialState, action ) => {

  switch ( action.type ) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload
      };

    case types.eventAddNew:

      return {
        ...state,
        events: [ ...state.events, action.payload ]
      };

    case types.eventClearActive:

      return {
        ...state,
        activeEvent: null
      };

    case types.eventUpdate:

      return {
        ...state,
        events: state.events.map( element => ( element.id === action.payload.id ) ? action.payload : element )
      };

    case types.eventDelete:

      return {
        ...state,
        events: state.events.filter( element => ( element.id !== action.payload.id ) ),
        activeEvent: null
      };

    case types.eventAllLoaded:

      return {
        ...state,
        events: [ ...action.payload ]
      };

    case types.eventClearCalendarStore:

      return {
        ...initialState
      };

    default:
      return state;
  }

};
