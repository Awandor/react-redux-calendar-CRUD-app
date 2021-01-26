import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'; // Se importa sólo para tener ayuda en el tipado de jest

import { AppRouter } from "../../routers/AppRouter";




// Creamos el mock del Store

const middlewares = [ thunk ];

const mockStore = configureStore( middlewares );



// Hacemos un mock de dispatch, no vamos a evaluar la Acción, sólo que se realiza el dispatch de eventStartDeleteAction

// store.dispatch = jest.fn();

// Hacemos un mock de authStartCheckingTokenAction

// jest.mock( '../../actions/authActions', ()=>( { authStartCheckingTokenAction: jest.fn() } ) );




describe( 'Pruebas en <AppRouter />', () => {

    test( 'debería mostrarse Espere...', () => {

        // Definimos el estado inicial

        const initialState = { auth: { checking: true } };

        let store = mockStore( initialState );

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect( wrapper ).toMatchSnapshot();

        expect( wrapper.find( 'h5' ).text().trim() ).toBe( 'Espere...' );

    } );

    test( 'debería mostrarse la página de login', () => {

        // Definimos el estado inicial

        const initialState = { auth: { checking: false } };

        let store = mockStore( initialState );

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect( wrapper ).toMatchSnapshot();

        expect( wrapper.find( '.login-container' ).exists() ).toBe( true );

    } );

    test( 'debería mostrarse la página de CalendarScreen', () => {

        // Definimos el estado inicial

        const initialState = {
            ui: {
                modelIsOpen: false
            },
            auth: { 
                checking: false,
                uid: '60003ae211250d41ecf18dc7'
            },
            calendar: {
                events: []
            }
        };

        let store = mockStore( initialState );

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect( wrapper ).toMatchSnapshot();

        expect( wrapper.find( '.rbc-calendar' ).exists() ).toBe( true );

    } );

} );
