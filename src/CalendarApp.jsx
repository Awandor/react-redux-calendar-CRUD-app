import React from 'react';
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';
import { Provider } from 'react-redux';

// Para trabajar con el store necesitamos envolver <Approuter /> con un <Provider>

export const CalendarApp = () => {

    return (
        <div>
            <Provider store={store}>
                <AppRouter />
            </Provider>
        </div>
    );

};
