import { authStartCheckingTokenAction, authStartLoginAction, authStartRegisterAction, startLogoutAction } from "../../actions/authActions";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom'; // Se importa sólo para tener ayuda en el tipado de jest


import { types } from "../../types/types";
import Swal from "sweetalert2";
import * as fetchHelper from '../../helpers/fetchHelper';

// Creamos el mock del Store

const middlewares = [ thunk ];

const mockStore = configureStore( middlewares );

// Definimos el estado inicial

const initialState = {};

let store = mockStore( initialState );

// Hacemos un mock de local storage setItem

Storage.prototype.setItem = jest.fn();

// Hacemos un mock de local storage removeItem

Storage.prototype.removeItem = jest.fn();

// Hacemos un mock de Swal.fire

Swal.fire = jest.fn();

// jest.mock('sweetalert2', ()=>({fire: jest.fn(}); // Otra forma de hacerlo

let token = '';


describe( 'Pruebas en authActions.js', () => {

  // Al principio de cada prueba ponemos el mock del Store a su estado inicial

  beforeEach( () => {

    store = mockStore( initialState );

    jest.clearAllMocks();

  } );

  // ========================================
  // authStartLoginAction
  // ========================================

  test( 'authStartLoginAction debería funcionar', async() => {

    await store.dispatch( authStartLoginAction( 'test@test.es', '123456' ) );

    const actions = store.getActions();

    // console.log( 'authStartLoginAction', actions );

    expect( actions[ 0 ] ).toEqual( {
      type: types.authLogin,
      payload: { uid: expect.any( String ), name: expect.any( String ) }
    } );

    expect( localStorage.setItem ).toHaveBeenCalled();

    expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', expect.any( String ) );

    expect( localStorage.setItem ).toHaveBeenCalledWith( 'token-init-date', expect.any( Number ) );

    // Podemos leer del mock de local storage

    // console.log( localStorage.setItem.mock.calls[ 0 ][ 1 ] ); // Nos devuelve el token

    token = localStorage.setItem.mock.calls[ 0 ][ 1 ];

  } );

  test( 'authStartLoginAction debería mostrar un error', async() => {

    await store.dispatch( authStartLoginAction( 'fallo@test.es', '123456' ) );

    const actions = store.getActions();

    expect( actions ).toEqual( [] );

    expect( Swal.fire ).toHaveBeenCalled();

    expect( Swal.fire ).toHaveBeenCalledWith( 'Error', expect.any( String ), 'error' );

  } );


  // ========================================
  // authStartRegisterAction
  // ========================================

  test( 'authStartRegisterAction debería funcionar', async() => {

    // OJO el Store es un mock, pero la base de datos no, el usuario se guarda en bbdd
    // por ello vamos a hacer un mock de fetchHelper.js que retorne un objeto así no grabamos en bbdd

    fetchHelper.fetchWithoutToken = jest.fn( () => ( {
      json() {

        return {
          ok: true,
          uid: '123',
          name: 'Carlos',
          token: 'ABC123ABC123'
        };

      }
    } ) );

    await store.dispatch( authStartRegisterAction( 'Pepito', 'pepito@test.es', '123456' ) );



    const actions = store.getActions();

    // console.log( 'authStartRegisterAction', actions );

    expect( actions[ 0 ] ).toEqual( {
      type: types.authLogin,
      payload: { uid: '123', name: 'Carlos' }
    } );

    expect( localStorage.setItem ).toHaveBeenCalled();

    expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', 'ABC123ABC123' );

    expect( localStorage.setItem ).toHaveBeenCalledWith( 'token-init-date', expect.any( Number ) );

  } );

  test( 'authStartRegisterAction debería mostrar un error', async() => {

    // simulamos la respuesta de fetchWithoutToken

    fetchHelper.fetchWithoutToken = jest.fn( () => ( {
      json() {

        return {
          ok: false,
          msg: 'Error'
        };

      }
    } ) );

    await store.dispatch( authStartRegisterAction( 'Dan', 'test@test.es', '123456' ) );

    expect( Swal.fire ).toHaveBeenCalled();

    expect( Swal.fire ).toHaveBeenCalledWith( 'Error', expect.any( String ), 'error' );

  } );

  test( 'authStartCheckingTokenAction debería funcionar', async() => {

    // console.log( 'token', token );

    // localStorage.setItem( 'token', token ); // No funciona porque hemos hecho previamente un mock de setItem

    // Hacemos un mock del retorno de fetchWithToken

    fetchHelper.fetchWithToken = jest.fn( () => ( {
      json() {

        return {
          ok: true,
          uid: '60003ae211250d41ecf18dc7',
          name: 'Pepito',
          token: '123ABC123ABC'
        };

      }
    } ) );

    await store.dispatch( authStartCheckingTokenAction() );

    // Si todo va bien se realiza el login

    const actions = store.getActions();

    // console.log( 'authStartCheckingTokenAction', actions );

    expect( actions[ 0 ] ).toEqual( {
      type: types.authLogin,
      payload: {
        name: 'Pepito',
        uid: '60003ae211250d41ecf18dc7'
      }
    } );

    expect( localStorage.setItem ).toHaveBeenCalled();

    expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', expect.any( String ) );

    expect( localStorage.setItem ).toHaveBeenCalledWith( 'token-init-date', expect.any( Number ) );

  } );

  test( 'authStartCheckingTokenAction debería mostrar un error', async() => {

    // simulamos la respuesta de fetchWithToken

    fetchHelper.fetchWithToken = jest.fn( () => ( {
      json() {

        return {
          ok: false,
          msg: 'Error'
        };

      }
    } ) );

    await store.dispatch( authStartCheckingTokenAction( '123456', 'Dan' ) );

    expect( Swal.fire ).toHaveBeenCalled();

    expect( Swal.fire ).toHaveBeenCalledWith( 'Error', expect.any( String ), 'error' );

  } );

  test( 'startLogoutAction debería funcionar', async() => {

    const resp = await store.dispatch( startLogoutAction() );

    // console.log( resp );

    // Si todo va bien se realiza el logout

    const actions = store.getActions();

    // console.log( 'startLogoutAction', actions );

    expect( actions[ 0 ] ).toEqual( {
      type: types.authLogout
    } );

    expect( actions[ 1 ] ).toEqual( {
      type: types.eventClearCalendarStore
    } );

    expect( localStorage.removeItem ).toHaveBeenCalled();

    expect( localStorage.removeItem ).toHaveBeenCalledWith( 'token' );

    expect( localStorage.removeItem ).toHaveBeenCalledWith( 'token-init-date' );

  } );


} );
