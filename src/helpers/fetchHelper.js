const baseUrl = process.env.REACT_APP_API_URL;

// console.log( process.env );

export const fetchWithoutToken = ( endpoint, data, method = 'GET' ) => {

  const url = `${baseUrl}/${endpoint}`;

  if ( method === 'GET' ) {

    // fetch es una API de los navegadores

    return fetch( url );

  }

  return fetch( url, {
    method,
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify( data )
  } );

};

export const fetchWithToken = ( endpoint, data, method = 'GET' ) => {

  // console.log( 'fetchWithToken data', data );

  const url = `${baseUrl}/${endpoint}`;

  if ( method === 'GET' ) {

    // Necesitamos enviar el token por headers

    return fetch( url, {
      method,
      headers: {
        'x-token': localStorage.getItem( 'token' ) || '' // evitamos el null
      }
    } );

  }

  return fetch( url, {
    method,
    headers: {
      'Content-type': 'application/json',
      'x-token': localStorage.getItem( 'token' ) || '' // evitamos el null
    },
    body: JSON.stringify( data )
  } );

};
