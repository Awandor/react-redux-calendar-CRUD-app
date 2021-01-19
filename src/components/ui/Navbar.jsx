import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogoutAction } from '../../actions/authActions';

export const Navbar = () => {

    // Vamos a leer del Store la propiedad name

    const { name } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const handleLogout = () => {

        dispatch( startLogoutAction() );

    };

    return (
        <div className="navbar navbar-dark bg-dark mb-4">

            <span className="navbar-brand">{name}</span>

            <button className="btn btn-outline-danger" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Salir</button>

        </div>
    );

};
