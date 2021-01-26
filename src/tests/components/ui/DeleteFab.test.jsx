import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'; // Se importa sólo para tener ayuda en el tipado de jest

import { DeleteFab } from "../../../components/ui/DeleteFab";
import { eventStartDeleteAction } from "../../../actions/calendarActions";

// Creamos el mock del Store

const middlewares = [ thunk ];

const mockStore = configureStore( middlewares );

// Definimos el estado inicial

const initialState = { calendar: { activeEvent: {} } };

let store = mockStore( initialState );

// Hacemos un mock de dispatch, no vamos a evaluar la Acción, sólo que se realiza el dispatch de eventStartDeleteAction

store.dispatch = jest.fn();

// Hacemos un mock de eventStartDeleteAction

jest.mock( '../../../actions/calendarActions', ()=>( { eventStartDeleteAction: jest.fn() } ) );

const wrapper = mount(
    <Provider store={store}>
        <DeleteFab />
    </Provider>
);


describe( 'Pruebas en <DeleteFab />', () => {

    test( 'debería mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();

    } );

    test( 'debería ejecutarse el eventStartDeleteAction', () => {

        wrapper.find( 'button' ).simulate( 'click' );

        // wrapper.find('button').prop('onClick')(); // la otra manera de hacerlo

        expect( store.dispatch ).toHaveBeenCalled(); // No está mal pero queremos saber si se ha ejecutado eventStartDeleteAction

        // Para ello creamos un mock de eventStartDeleteAction

        expect( eventStartDeleteAction ).toHaveBeenCalled();

    } );

} );
