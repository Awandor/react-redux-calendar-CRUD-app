import React, { useEffect, useState } from 'react';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';

import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModalStoreAction } from '../../actions/uiActions';
import { eventClearActiveStoreAction, eventSetActiveStoreAction, eventStartLoadAllEventsAction } from '../../actions/calendarActions';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteFab } from '../ui/DeleteFab';

moment.locale( 'es' );

const localizer = momentLocalizer( moment );

/* const events = [ {
    title: 'Cumpleaños de Alguien',
    start: moment().toDate(),
    end: moment().add( 2, 'hours' ).toDate(),

    // bgcolor: 'tomato',
    user: {
        _id: '123',
        name: 'Dan'
    }
} ]; */

export const CalendarScreen = () => {

    const [ lastView, setlastView ] = useState( localStorage.getItem( 'lastView' ) || 'month' );

    // Necesitamos useDispatch para depachar Acciones

    const dispatch = useDispatch();

    // Si quiero estar pendiente de un cambio de algo del State del Store usamos useSelector

    const events = useSelector( state => state.calendar.events );

    // console.log( events );

    // Vamos a estar pendientes de cambios en activeEvent

    const { activeEvent } = useSelector( state => state.calendar );

    const { uid } = useSelector( state => state.auth );

    useEffect( () => {

        dispatch( eventStartLoadAllEventsAction() );
        
    }, [ dispatch ] ); // Como dispatch no va a cambiar useEffect sólo se disparará al cargar el componente la primera vez


    const handleDoubleClick = ( e ) => {

        // console.log( e );

        dispatch( uiOpenModalStoreAction() );

    };

    const handleSelect = ( e ) => {

        // console.log( e );

        dispatch( eventSetActiveStoreAction( e ) );

    };

    const handleViewChange = ( e ) => {

        // console.log( e );

        setlastView( e );

        localStorage.setItem( 'lastView', e );

    };

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        // console.log( { event, start, end, isSelected } );

        /* let bgColor = '#0079ff';

        if( uid === event.user._id ){

            bgColor = 'tomato';

        } */

        // Lo resolvemos mejor con un ternario

        const style = {
            backgroundColor: ( uid === event.user._id ) ? 'tomato' : '#0079ff',
            opacity: .8,
            display: 'block',
            color: 'white'
        };

        return { style };

    };

    const handleSelectSlot = () => {

        console.log( 'Click fuera' );

        dispatch( eventClearActiveStoreAction() );

    };

    return (
        <div className="calendar-screen">
            <Navbar />
            <h1>CalendarScreen</h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={handleDoubleClick}
                onSelectEvent={handleSelect}
                onView={handleViewChange}
                selectable={true}
                onSelectSlot={handleSelectSlot}
                view={lastView}
                components={{ event: CalendarEvent }}
            />

            <AddNewFab />

            { ( activeEvent ) && <DeleteFab />}

            <CalendarModal />
        </div>
    );

};
