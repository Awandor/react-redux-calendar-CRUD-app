import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetchHelper";


describe( 'Pruebas en fetchHelper.js', () => {

  let token = '';

  test( 'fetchWithoutToken debería funcionar', async() => {

    const resp = await fetchWithoutToken( 'auth/login', { email: 'test@test.es', password: '123456' }, 'POST' );

    // console.log( resp );

    expect( resp instanceof Response ).toBe( true );

    const body = await resp.json();

    token = body.token;

    // Grabamos el token en local storage

    localStorage.setItem( 'token', token );

    expect( body.ok ).toBe( true );

  } );

  test( 'fetchWithToken debería funcionar', async() => {

    // Tenemos el token en el local storage

    const resp = await fetchWithToken( 'auth/renew' );

    // console.log( resp );

    expect( resp instanceof Response ).toBe( true );

    const body = await resp.json();

    expect( body.ok ).toBe( true );

  } );

} );
