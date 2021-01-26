import { uiReducer } from "../../reducers/uiReducer";
import { uiCloseModalStoreAction, uiOpenModalStoreAction } from "../../actions/uiActions";

// Definimos el estado inicial

const initialState = {
  modalIsOpen: false
};



describe( 'Pruebas en uiReducer.js', () => {

  test( 'debería retornar el estado por defecto', () => {

    const state = uiReducer( initialState, {} ); // Por fuerza necesita una Acción

    expect( state ).toEqual( initialState );

  } );

  test( 'debería abir y cerrar la modal', () => {

    // Abrir

    let openModalAction = uiOpenModalStoreAction();

    const state = uiReducer( initialState, openModalAction );

    // console.log( state ); // true

    expect( state.modalIsOpen ).toBe( true );


    // Cerrar

    openModalAction = uiCloseModalStoreAction();

    const state2 = uiReducer( state, openModalAction );

    expect( state2.modalIsOpen ).toBe( false );

  } );



} );
