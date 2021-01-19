import React from 'react';

// Recibe la prop del event
export const CalendarEvent = ( { event } ) => {

    // console.log( event );

    const { title, user } = event;

    return (
        <div>
            <span>{title}</span>
            <strong> - {user.name}</strong>
        </div>
    );

};
