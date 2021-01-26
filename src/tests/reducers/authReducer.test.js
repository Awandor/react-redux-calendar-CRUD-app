import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";


const initialState = {
  checking: true
};

const state = {};

describe( 'Pruebas en authReducer.js', () => {

  test( 'debería retornar el estado por defecto', () => {

    const state = authReducer( initialState, {} ); // Por fuerza necesita una Acción

    expect( state ).toEqual( initialState );

  } );

  test( 'debería hacer login', () => {

    const action = {
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'Paco'
      }
    };

    const state = authReducer( initialState, action );

    // console.log( state );

    expect( state ).toEqual( { checking: false, uid: '123', name: 'Paco' } );

  } );

  test( 'debería hacer logout', () => {

    const action = {
      type: types.authLogout
    };

    const state = authReducer( initialState, action );

    // console.log( state );

    expect( state ).toEqual( { checking: true } );

  } );

  test( 'debería terminar el checking', () => {

    const action = {
      type: types.authCheckingFinish
    };

    const state = authReducer( initialState, action );

    console.log( state );

    expect( state ).toEqual( { checking: false } );

  } );


} );
