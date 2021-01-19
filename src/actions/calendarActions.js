import { fetchWithToken } from "../helpers/fetchHelper";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { adjustEventsDates } from "../helpers/adjustEventsDates";


// ========================================
// Active event
// ========================================

export const eventSetActiveStoreAction = ( event ) => ( {
  type: types.eventSetActive,
  payload: event
} );

export const eventClearActiveStoreAction = () => ( { type: types.eventClearActive } );


// ========================================
// Create new event
// ========================================

export const eventStartAddNewEventAction = ( event ) => {

  console.log( 'evento recibido por eventStartAddNewEventAction', event );

  // Como es una Acción asíncrona retornamos una función con async

  return async( dispatch, getState ) => {

    try {

      const resp = await fetchWithToken( 'events', event, 'POST' );

      const body = await resp.json(); // await porque json() retorna una promesa

      // console.log( 'eventStartAddNewEventAction', body );

      if ( body.ok ) {

        // Vamos a leer del Store el uid y el name con getState

        const { uid, name } = getState().auth;

        const newEvent = {
          ...event,
          id: body.event.id,
          user: {
            _id: uid,
            name
          }
        };

        // console.log( 'newEvent', newEvent );

        dispatch( eventAddNewEventStoreAction( newEvent ) );

      } else {

        Swal.fire( 'Error', body.msg, 'error' );

      }

    } catch ( error ) {

      Swal.fire( 'Error', error, 'error' );

    }

  };

};

export const eventAddNewEventStoreAction = ( event ) => ( {
  type: types.eventAddNew,
  payload: event
} );


// ========================================
// Load all events 
// ========================================

export const eventStartLoadAllEventsAction = () => {

  // Como es una Acción asíncrona retornamos una función con async

  return async( dispatch, getState ) => {

    try {

      const resp = await fetchWithToken( 'events' ); // es un GET

      const body = await resp.json(); // await porque json() retorna una promesa

      // console.log( 'eventStartLoadAllEventsAction', body );

      if ( body.ok ) {

        const events = adjustEventsDates( body.events );

        dispatch( eventLoadAllEventsAction( events ) );

      } else {

        Swal.fire( 'Error', body.msg, 'error' );

      }

    } catch ( error ) {

      Swal.fire( 'Error', error, 'error' );

    }

  };

};

export const eventLoadAllEventsAction = ( events ) => ( { type: types.eventAllLoaded, payload: events } );


// ========================================
// Update event
// ========================================

export const eventStartUpdateEventAction = ( event ) => {

  // Como es una Acción asíncrona retornamos una función con async

  return async( dispatch, getState ) => {

    try {

      const resp = await fetchWithToken( `events/${event.id}`, event, 'PUT' );

      const body = await resp.json(); // await porque json() retorna una promesa

      // console.log( 'eventStartUpdateEventAction', body );

      if ( body.ok ) {

        dispatch( eventUpdateStoreAction( event ) );

      } else {

        Swal.fire( 'Error', body.msg, 'error' );

      }

    } catch ( error ) {

      Swal.fire( 'Error', error, 'error' );

    }

  };

};

export const eventUpdateStoreAction = ( event ) => ( {
  type: types.eventUpdate,
  payload: event
} );


// ========================================
// Delete event
// ========================================

export const eventStartDeleteAction = ( event ) => {

  // Como es una Acción asíncrona retornamos una función con async

  return async( dispatch ) => {

    try {

      const resp = await fetchWithToken( `events/${event.id}`, {}, 'DELETE' );

      const body = await resp.json(); // await porque json() retorna una promesa

      console.log( 'eventStartDeleteAction', body );

      if ( body.ok ) {

        dispatch( eventDeleteStoreAction( event ) );

      } else {

        Swal.fire( 'Error', body.msg, 'error' );

      }

    } catch ( error ) {

      Swal.fire( 'Error', error, 'error' );

    }

  };

};

export const eventDeleteStoreAction = ( event ) => ( {
  type: types.eventDelete,
  payload: event
} );


// ========================================
// Clear Calendar
// ========================================

export const eventClearCalendarStoreAction = ( event ) => ( {
  type: types.eventClearCalendarStore
} );
