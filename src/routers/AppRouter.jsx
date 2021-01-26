import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, /* Route, */ Switch } from 'react-router-dom';
import { authStartCheckingTokenAction } from '../actions/authActions';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    // Necesitamos verificar que checking sea false eso significa que el usuario está autenticado
    // como vamos a leer del store usamos useSelector

    const { checking, uid } = useSelector( state => state.auth );

    // React está pendiente de los cambios de checking y de uid,si cambia se redibuja el componente

    const dispatch = useDispatch();

    useEffect( () => {

        dispatch( authStartCheckingTokenAction() );

    }, [ dispatch ] );


    console.log( 'checking', checking );

    if ( checking ) {

        return ( <h5>Espere...</h5> );

    }

    return (
        <Router>
            { /* Se aconseja meter el switch en un div */}
            <div>
                <Switch>

                    {/* <Route exact path="/login">
                        <LoginScreen />
                    </Route>

                    <Route exact path="/">
                        <CalendarScreen />
                    </Route> */}

                    {/* La doble negación de un string es true, así convertimos un string en un booleano */}

                    {/* La doble negación de null es false */}

                    <PublicRoute isAuthenticated={!!uid} exact path="/login" component={LoginScreen} />


                    <PrivateRoute isAuthenticated={!!uid} exact path="/" component={CalendarScreen} />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );

};
