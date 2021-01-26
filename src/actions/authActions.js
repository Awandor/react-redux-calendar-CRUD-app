import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetchHelper";
import { types } from "../types/types";
import { eventClearCalendarStoreAction } from "./calendarActions";

// ========================================
// Login
// ========================================

export const authStartLoginAction = ( email, password ) => {

  // Como es una Acción asíncrona retornamos una función con async

  return async( dispatch ) => {

    // console.log( email, password );

    const resp = await fetchWithoutToken( 'auth/login', { email, password }, 'POST' );

    const body = await resp.json(); // await porque json() retorna una promesa

    // console.log( body );

    if ( body.ok ) {

      localStorage.setItem( 'token', body.token );

      localStorage.setItem( 'token-init-date', new Date().getTime() );

      dispatch( authLoginStoreAction( { uid: body.uid, name: body.name } ) );

    } else {

      Swal.fire( 'Error', body.msg, 'error' );

    }

  };

};

export const authLoginStoreAction = ( user ) => ( { type: types.authLogin, payload: user } );


// ========================================
// Register user
// ========================================

export const authStartRegisterAction = ( name, email, password ) => {

  // Como es una Acción asíncrona retornamos una función con async

  return async( dispatch ) => {

    // console.log( name, email, password );

    const resp = await fetchWithoutToken( 'auth/register', { name, email, password }, 'POST' );

    const body = await resp.json(); // await porque json() retorna una promesa

    // console.log( 'authStartRegisterAction', body );

    if ( body.ok ) {

      localStorage.setItem( 'token', body.token );

      localStorage.setItem( 'token-init-date', new Date().getTime() );

      dispatch( authLoginStoreAction( { uid: body.uid, name: body.name } ) );

    } else {

      Swal.fire( 'Error', body.msg, 'error' );

    }

  };

};


// ========================================
// Check token
// ========================================

export const authStartCheckingTokenAction = () => {

  return async( dispatch ) => {

    // La ruta renew del backend sólo necesita el token, no tiene body

    const resp = await fetchWithToken( 'auth/renew' );

    const body = await resp.json(); // await porque json() retorna una promesa

    // console.log( 'authStartCheckingTokenAction', body );

    if ( body.ok ) {

      localStorage.setItem( 'token', body.token );

      localStorage.setItem( 'token-init-date', new Date().getTime() );

      dispatch( authLoginStoreAction( { uid: body.uid, name: body.name } ) );

    } else {

      Swal.fire( 'Error', body.msg, 'error' );

      dispatch( authCheckingTokenFinishStoreAction() );

    }

  };

};

const authCheckingTokenFinishStoreAction = () => ( { type: types.authCheckingFinish } );


// ========================================
// Logout
// ========================================

export const startLogoutAction = () => {

  // La manejamos como si fuera una función asíncrona para tener acceso a dispatch

  return ( dispatch ) => {

    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'token-init-date' );

    dispatch( logoutStoreAction() );

    dispatch( eventClearCalendarStoreAction() );

  };

};

export const logoutStoreAction = () => ( { type: types.authLogout } );
