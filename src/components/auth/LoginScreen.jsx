import React from 'react';
import './login.css';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { authStartLoginAction, authStartRegisterAction } from '../../actions/authActions';
import Swal from 'sweetalert2';

export const LoginScreen = () => {

    // ========================================
    // Login
    // ========================================

    const initialLoginState = {

        /* loginEmail: 'test@test.es',
        loginPassword: '123456' */

        loginEmail: '',
        loginPassword: ''
    };

    const [ formLoginValues, handleLoginInputChange ] = useForm( initialLoginState );

    const { loginEmail, loginPassword } = formLoginValues;

    // Necesitamos useDispatch para despachar Acciones

    const dispatch = useDispatch();

    const handleLogin = ( e ) => {

        e.preventDefault();

        // console.log( formLoginValues );

        dispatch( authStartLoginAction( loginEmail, loginPassword ) );

    };

    // ========================================
    // Register
    // ========================================

    const initialRegisterState = {
        registerName: '',
        registerEmail: '',
        registerPassword: '',
        registerPassword2: ''
    };

    const [ formRegisterValues, handleRegisterInputChange ] = useForm( initialRegisterState );

    const { registerName, registerEmail, registerPassword, registerPassword2 } = formRegisterValues;

    const handleRegister = ( e ) => {

        e.preventDefault();

        // console.log( formRegisterValues );

        if ( registerPassword !== registerPassword2 ) {

            return Swal.fire( 'Error', 'Las contraseñas no coinciden', 'error' );

        }

        dispatch( authStartRegisterAction( registerName, registerEmail, registerPassword ) );

    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={registerName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

};
