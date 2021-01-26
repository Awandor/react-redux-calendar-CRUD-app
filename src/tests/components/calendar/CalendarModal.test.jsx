import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'; // Se importa sólo para tener ayuda en el tipado de jest

// import { act } from "react-dom/test-utils";
import { CalendarModal } from "../../../components/calendar/CalendarModal";
import moment from 'moment';
import { eventStartUpdateEventAction, eventClearActiveStoreAction, eventStartAddNewEventAction } from "../../../actions/calendarActions";
import { uiCloseModalStoreAction } from "../../../actions/uiActions";
import { act } from "react-dom/test-utils";
import Swal from "sweetalert2";

// Creamos el mock del Store

const middlewares = [ thunk ];

const mockStore = configureStore( middlewares );

// Definimos el estado inicial

const now = moment().minutes( 0 ).seconds( 0 ).add( 1, 'hour' );

const nowPlusOneHour = now.clone().add( 1, 'hour' );

const initialState = {
    ui: {
        modalIsOpen: true
    },
    auth: {
        checking: false,
        uid: '12345',
        name: 'Dan'
    },
    calendar: {
        events: [],
        activeEvent: {
            title: 'Mock title',
            notes: 'Mock notes',
            start: now.toDate(),
            end: nowPlusOneHour.toDate()
        }
    }
};


let store = mockStore( initialState );

// Hacemos un mock de dispatch, no vamos a evaluar la Acción, sólo que se realiza el dispatch de la Acción

store.dispatch = jest.fn();

// Hacemos un mock de varias Acciones

jest.mock( '../../../actions/calendarActions', () => ( {
    eventStartUpdateEventAction: jest.fn(),
    eventClearActiveStoreAction: jest.fn(), // añadido pues sino sale un error
    eventStartAddNewEventAction: jest.fn()
} ) );

jest.mock( '../../../actions/uiActions', () => ( {
    uiCloseModalStoreAction: jest.fn()
} ) );

// Hacemos un mock de setItem

Storage.prototype.setItem = jest.fn();

// Hacemos un mock de Swal.fire

Swal.fire = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarModal />
    </Provider>
);


describe( 'Pruebas en <CalendarModal />', () => {

    // Al principio de cada prueba ponemos el mock del Store a su estado inicial

    beforeEach( () => {

        // store = mockStore(initialState);

        jest.clearAllMocks();

    } );

    test( 'debería mostrar la modal', () => {

        // No vamos a hacer un match con el snapshot pues hay cosas que se calculan de forma dinámica

        // expect( wrapper.find( '.modal' ).exists() ).toBe( true ); // falso positivo porque la modal existe aunque no esté abierta

        expect( wrapper.find( 'Modal' ).prop( 'isOpen' ) ).toBe( true );

        // Para que funcione debemos añadir la propiedad ariaHideApp=false en CalendarModal.jsx > Modal de forma condicional
        // y en setupTests.js añadimos HTMLCanvasElement.prototype.getContext = () => {};

    } );

    test( 'debería llamar la acción de actualizar y cerrar la modal', () => {

        // wrapper.find( 'form' ).prop( 'onSubmit' )();
        wrapper.find( 'form' ).simulate( 'submit', { preventDefault() { } } );

        // expect( eventStartUpdateEventAction ).toHaveBeenCalledWith( { end: nowPlusOneHour.toDate(), notes: 'Mock notes', start: now.toDate(), title: 'Mock title' } );

        expect( eventStartUpdateEventAction ).toHaveBeenCalledWith( initialState.calendar.activeEvent ); // más sencillo

        expect( uiCloseModalStoreAction ).toHaveBeenCalled();

        expect( eventClearActiveStoreAction ).toHaveBeenCalled();

    } );

    test( 'debería mostrar error si falta el título', () => {

        // Como en el test anterior hemos cerrado la modal se han limpiado todos los inputs, no tenemos título

        wrapper.find( 'form' ).simulate( 'submit', { preventDefault() { } } );

        expect( wrapper.find( 'input[name="title"]' ).hasClass( 'is-invalid' ) ).toBe( true );

    } );

    test( 'debería llamar a la creación de un nuevo evento', () => {

        const otherState = {
            ui: {
                modalIsOpen: true
            },
            auth: {
                checking: false,
                uid: '12345',
                name: 'Dan'
            },
            calendar: {
                events: [],
                activeEvent: null
            }
        };

        store = mockStore( otherState );

        store.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <CalendarModal />
            </Provider>
        );

        wrapper.find( 'input[name="title"]' ).simulate( 'change', { target: { name: 'title', value: 'Nuevo título' } } );

        wrapper.find( 'textarea[name="notes"]' ).simulate( 'change', { target: { name: 'notes', value: 'Nuevo notes' } } );

        wrapper.find( 'DateTimePicker[name="startDate"]' ).simulate( 'change', { target: { name: 'startDate', value: moment( now ).toDate() } } );

        wrapper.find( 'DateTimePicker[name="endDate"]' ).simulate( 'change', { target: { name: 'endDate', value: moment( nowPlusOneHour ).toDate() } } );

        wrapper.find( 'form' ).simulate( 'submit', { preventDefault() { } } );

        expect( eventStartAddNewEventAction ).toHaveBeenCalledWith( { title: 'Nuevo título', notes: 'Nuevo notes', start: expect.anything(), end: expect.anything() } );

        expect( uiCloseModalStoreAction ).toHaveBeenCalled();

        expect( eventClearActiveStoreAction ).toHaveBeenCalled();

    } );

    test( 'debería validar las fechas', () => {

        wrapper.find( 'input[name="title"]' ).simulate( 'change', { target: { name: 'title', value: 'Nuevo título' } } );

        const hoy = new Date();

        act( () => {

            wrapper.find( 'DateTimePicker' ).at( 1 ).prop( 'onChange' )( hoy );

        } );

        wrapper.find( 'form' ).simulate( 'submit', { preventDefault() { } } );

        expect( Swal.fire ).toHaveBeenCalledWith( 'Error', 'Fecha fin debe ser mayor a fecha de inicio', 'error' );

    } );



} );
