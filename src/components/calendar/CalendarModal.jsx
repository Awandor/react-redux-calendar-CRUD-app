import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModalStoreAction } from '../../actions/uiActions';
import { eventClearActiveStoreAction, eventStartAddNewEventAction, eventStartUpdateEventAction } from '../../actions/calendarActions';


// Estas variables las ponemos fuera del componente para que no se tengan que volver a calcular cuando cambie el estado

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const now = moment().minutes( 0 ).seconds( 0 ).add( 1, 'hour' );

const nowPlusOneHour = now.clone().add( 1, 'hour' );

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlusOneHour.toDate()
};

// Make sure to bind modal to your appElement

Modal.setAppElement( '#root' );

export const CalendarModal = () => {

    // const [ modalIsOpen, setModalIsOpen ] = useState( true ); // Lo vamos a manejar con Redux


    // Si quiero estar pendiente de cambios de algo del State del Store usamos useSelector

    const { modalIsOpen } = useSelector( state => state.ui );

    const [ dateStart, setDateStart ] = useState( now.toDate() );

    const [ dateEnd, setDateEnd ] = useState( nowPlusOneHour.toDate() );

    const [ formValues, setFormValues ] = useState( initEvent );

    const { notes, title, start, end } = formValues;

    const [ titleValid, setTitleValid ] = useState( true );

    // Vamos a estar pendientes de cambios en activeEvent

    const { activeEvent } = useSelector( state => state.calendar );

    useEffect( () => {

        // console.log( 'activeEvent ha cambiado', activeEvent );

        if ( activeEvent ) {

            setFormValues( activeEvent );

        } else {

            setFormValues( initEvent );

        }

    }, [ activeEvent ] ); // Ponemos como dependencia activeEvent para escuchar cambios en él

    // Necesitamos useDispatch para despachar Acciones

    const dispatch = useDispatch();

    const handleCloseModal = () => {

        console.log( 'Closing modal' );

        // setModalIsOpen( false );

        dispatch( uiCloseModalStoreAction() );

        // Limpiamos los campos de la modal

        setFormValues( initEvent );

        // Borramos el activeEvent

        dispatch( eventClearActiveStoreAction() );

    };

    const handleDateStartChange = ( e ) => {

        // console.log( e );

        setDateStart( e );

        setFormValues( {
            ...formValues,
            start: e
        } );

    };

    const handleDateEndChange = ( e ) => {

        // console.log( e );

        setDateEnd( e );

        setFormValues( {
            ...formValues,
            end: e
        } );

    };

    const handleInputChange = ( { target } ) => {

        setFormValues( {
            ...formValues,
            [target.name]: target.value // computamos el nombre de la propiedad con llaves cuadradas
        } );

        if ( title.trim().length < 2 ) {

            return setTitleValid( false ); // se puede poner el return después

        }

    };

    const handleSubmit = ( e ) => {

        e.preventDefault();

        // console.log( formValues );

        const momentStart = moment( start );

        const momentEnd = moment( end );

        if ( momentStart.isSameOrAfter( momentEnd ) ) {

            console.log( 'Fecha fin debe ser mayor a fecha de inicio' );

            Swal.fire( 'Error', 'Fecha fin debe ser mayor a fecha de inicio', 'error' );

            return;

        }

        if ( title.trim().length < 2 ) {

            return setTitleValid( false ); // se puede poner el return después

        }


        // Si tenemos un activeEvent es que estamos editando y podemos hacer el update

        if ( activeEvent ) {

            console.log( 'activeEvent', formValues );

            dispatch( eventStartUpdateEventAction( formValues ) );

        } else {

            /* dispatch( eventAddNewEventStoreAction( {
                ...formValues,
                id: new Date().getTime(), // De forma temporal hasta que tengamos bbdd
                user: {
                    _id: '123',
                    name: 'Erik'
                }
            } ) ); */

            console.log( 'CalendarModal eventStartAddNewEventAction', formValues );

            dispatch( eventStartAddNewEventAction( formValues ) );

        }



        setTitleValid( true );

        handleCloseModal();

    };

    return (
        <div>
            <Modal

                // isOpen={modalIsOpen}
                isOpen={modalIsOpen}

                // onAfterOpen={afterOpenModal}
                onRequestClose={handleCloseModal}
                style={customStyles}
                className="modal"
                overlayClassName="modal-fondo"
                closeTimeoutMS={200}
            >
                <h1> {( activeEvent ) ? 'Editar evento' : 'Nuevo evento'} </h1>
                <hr />
                <form className="container" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Fecha y hora inicio</label>
                        <DateTimePicker name="startDate" className="form-control" onChange={handleDateStartChange} value={moment( start ).toDate()} />
                    </div>

                    <div className="form-group">
                        <label>Fecha y hora fin</label>
                        <DateTimePicker name="endDate" className="form-control" minDate={dateStart} onChange={handleDateEndChange} value={moment( end ).toDate()} />
                    </div>

                    <hr />
                    <div className="form-group">
                        <label>Titulo y notas</label>
                        <input
                            type="text"
                            name="title"
                            className={`form-control ${!titleValid && 'is-invalid'}`}
                            placeholder="Título del evento"
                            autoComplete="off"
                            value={title}
                            onChange={handleInputChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>

                    <div className="form-group">
                        <textarea
                            type="text"
                            name="notes"
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            value={notes}
                            onChange={handleInputChange}
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>

                    <button type="submit" className="btn btn-outline-primary btn-block">
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

                </form>
            </Modal>
        </div>
    );

};
