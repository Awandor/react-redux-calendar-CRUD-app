import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'; // Se importa sólo para tener ayuda en el tipado de jest

import { LoginScreen } from "../../../components/auth/LoginScreen";
import { authStartLoginAction, authStartRegisterAction } from "../../../actions/authActions";
import Swal from "sweetalert2";


// Creamos el mock del Store

const middlewares = [ thunk ];

const mockStore = configureStore( middlewares );

// Definimos el estado inicial

const initialState = { calendar: { activeEvent: {} } };

let store = mockStore( initialState );

// Hacemos un mock de dispatch, no vamos a evaluar la Acción, sólo que se realiza el dispatch de authStartLoginAction

store.dispatch = jest.fn();

// Hacemos un mock de authStartLoginAction y authStartLoginAction

jest.mock( '../../../actions/authActions', () => ( { authStartLoginAction: jest.fn(), authStartRegisterAction: jest.fn() } ) );

// Hacemos un mock de Swal.fire

Swal.fire = jest.fn();

// jest.mock('sweetalert2', ()=>({fire: jest.fn(}); // Otra forma de hacerlo

const wrapper = mount(
    <Provider store={store}>
        <LoginScreen />
    </Provider>
);


describe( 'Pruebas en <LoginScreen />', () => {

    // Al principio de cada prueba ponemos el mock del Store a su estado inicial

    beforeEach( () => {

        store = mockStore( initialState );

        jest.clearAllMocks();

    } );


    // ========================================
    // Login
    // ========================================

    test( 'debería mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();

        expect( wrapper.find( '.login-container' ).exists() ).toBe( true );

    } );

    test( 'debería hacerse el dispatch de authStartLoginAction', () => {

        // Rellenamos los campos

        wrapper.find( 'input[name="loginEmail"]' ).simulate( 'change', { target: { name: 'loginEmail', value: 'test@test.es' } } );

        wrapper.find( 'input[name="loginPassword"]' ).simulate( 'change', { target: { name: 'loginPassword', value: '123456' } } );

        // Simulamos el submit

        wrapper.find( 'form' ).at( 0 ).simulate( 'submit' );

        // wrapper.find( 'form' ).at(0).prop('onSubmit')(); // la otra manera de hacerlo

        // Queremos saber si se ha ejecutado authStartLoginAction para ello creamos un mock de authStartLoginAction

        expect( authStartLoginAction ).toHaveBeenCalled();

        expect( authStartLoginAction ).toHaveBeenCalledWith( 'test@test.es', '123456' );

    } );


    // ========================================
    // Register
    // ========================================

    test( 'debería hacerse el dispatch de authStartRegisterAction', () => {

        // Rellenamos los campos

        wrapper.find( 'input[name="registerName"]' ).simulate( 'change', { target: { name: 'registerName', value: 'Dan' } } );

        wrapper.find( 'input[name="registerEmail"]' ).simulate( 'change', { target: { name: 'registerEmail', value: 'test@test.es' } } );

        wrapper.find( 'input[name="registerPassword"]' ).simulate( 'change', { target: { name: 'registerPassword', value: '123456' } } );

        wrapper.find( 'input[name="registerPassword2"]' ).simulate( 'change', { target: { name: 'registerPassword2', value: '123456' } } );

        // Simulamos el submit

        wrapper.find( 'form' ).at( 1 ).simulate( 'submit' );

        // wrapper.find( 'form' ).at(1).prop('onSubmit')(); // la otra manera de hacerlo

        // Queremos saber si se ha ejecutado authStartRegisterAction para ello creamos un mock de authStartRegisterAction

        expect( authStartRegisterAction ).toHaveBeenCalled();

        expect( authStartRegisterAction ).toHaveBeenCalledWith( 'Dan', 'test@test.es', '123456' );

    } );

    test( 'debería aparecer Sweet Alert 2 con mensaje Las contraseñas no coinciden y authStartRegisterAction no se debería disparar', () => {

        // Rellenamos los campos

        wrapper.find( 'input[name="registerName"]' ).simulate( 'change', { target: { name: 'registerName', value: 'Dan' } } );

        wrapper.find( 'input[name="registerEmail"]' ).simulate( 'change', { target: { name: 'registerEmail', value: 'test@test.es' } } );

        wrapper.find( 'input[name="registerPassword"]' ).simulate( 'change', { target: { name: 'registerPassword', value: '123456' } } );

        wrapper.find( 'input[name="registerPassword2"]' ).simulate( 'change', { target: { name: 'registerPassword2', value: '123457' } } );

        // Simulamos el submit

        wrapper.find( 'form' ).at( 1 ).simulate( 'submit' );

        // wrapper.find( 'form' ).at(1).prop('onSubmit')(); // la otra manera de hacerlo

        expect( Swal.fire ).toHaveBeenCalledWith( 'Error', 'Las contraseñas no coinciden', 'error' );

        expect( authStartRegisterAction ).toHaveBeenCalledTimes( 0 );

        // expect( authStartRegisterAction ).not.toHaveBeenCalled(); // otra manera

    } );

} );
