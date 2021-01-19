import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eventStartDeleteAction } from '../../actions/calendarActions';

export const DeleteFab = () => {

    // Vamos a estar pendientes de cambios en activeEvent

    const { activeEvent } = useSelector( state => state.calendar );

    // Necesitamos useDispatch para despachar Acciones

    const dispatch = useDispatch();

    const handleClickDeleteEvent = () => {

        dispatch( eventStartDeleteAction( activeEvent ) );

    };

    return (
        <button className="btn btn-danger fab-delete" onClick={handleClickDeleteEvent}>
            <i className="fas fa-trash"></i>
        </button>
    );

};
