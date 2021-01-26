import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'; // Se importa sólo para tener ayuda en el tipado de jest

import { CalendarScreen } from "../../../components/calendar/CalendarScreen";
import { eventStartLoadAllEventsAction, eventSetActiveStoreAction, eventClearActiveStoreAction } from "../../../actions/calendarActions";
import { uiOpenModalStoreAction } from "../../../actions/uiActions";
import { messages } from "../../../helpers/calendar-messages-es";
import { act } from "react-dom/test-utils";

// Creamos el mock del Store

const middlewares = [ thunk ];

const mockStore = configureStore( middlewares );

// Definimos el estado inicial

const initialState = {
    ui: {
        modalIsOpen: false
    },
    auth: {
        checking: false,
        uid: '12345',
        name: 'Dan'
    },
    calendar: {
        events: [],
        activeEvent: {}
    }
};

let store = mockStore( initialState );

// Hacemos un mock de dispatch, no vamos a evaluar la Acción, sólo que se realiza el dispatch de la Acción

store.dispatch = jest.fn();

// Hacemos un mock de varias Acciones

jest.mock( '../../../actions/calendarActions', () => ( { 
    eventStartLoadAllEventsAction: jest.fn(), 
    eventSetActiveStoreAction: jest.fn(), 
    eventClearActiveStoreAction: jest.fn() 
} ) );

jest.mock( '../../../actions/uiActions', () => ( { uiOpenModalStoreAction: jest.fn() } ) );

// Hacemos un mock de setItem

Storage.prototype.setItem = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen />
    </Provider>
);

describe( 'Pruebas en <CalendarScreen />', () => {

    test( 'debería mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot(); // El calendario se abre con la fecha actual con lo que el snapshot hay que actualizarlo

        expect( wrapper.find( '.calendar-screen' ).exists() ).toBe( true );

    } );

    test( 'debería tener los messages', () => {

        const calendarMessages = wrapper.find( 'Calendar' ).prop( 'messages' ); // no dispara ningún handler

        expect( calendarMessages ).toEqual( messages );
        
    } );

    test( 'debería leer del local storage el último view', () => {

        //When testing, code that causes React state updates should be wrapped into act 

        act( ()=>{

            wrapper.find( 'Calendar' ).prop( 'onView' )( 'week' );
    
            expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastView', 'week' );

        } );
        
    } );

    test( 'debería tener selectable true', () => {

        const calendarSelectable = wrapper.find( 'Calendar' ).prop( 'selectable' ); // no dispara ningún handler

        expect( calendarSelectable ).toBe( true );
        
    } );
    

    test( 'debería hacerse el dispatch de uiOpenModalStoreAction', () => {

        wrapper.find( 'Calendar' ).prop( 'onDoubleClickEvent' )();

        expect( uiOpenModalStoreAction ).toHaveBeenCalled();
        
    } );

    test( 'debería hacerse el dispatch de eventSetActiveStoreAction', () => {

        wrapper.find( 'Calendar' ).prop( 'onSelectEvent' )();

        expect( eventSetActiveStoreAction ).toHaveBeenCalled();
        
    } );

    test( 'debería hacerse el dispatch de eventClearActiveStoreAction', () => {

        wrapper.find( 'Calendar' ).prop( 'onSelectSlot' )();

        expect( eventClearActiveStoreAction ).toHaveBeenCalled();
        
    } );
    
} );
