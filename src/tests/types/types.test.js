import { types } from "../../types/types";

describe( 'Pruebas de types.js', () => {

  test( 'types debería ser igual', () => {

    expect( types ).toEqual( {
      uiOpenModalAction: '[ui reducer] Open Modal',
      uiCloseModalAction: '[ui reducer] Close Modal',

      eventSetActive: '[event reducer] Set event to active',

      // eventStartAddNew: '[event reducer] Start Add new event',
      eventAddNew: '[event reducer] Add new event',
      eventClearActive: '[event reducer] Clear active event',
      eventUpdate: '[event reducer] Update an event',
      eventDelete: '[event reducer] Delete an event',
      eventAllLoaded: '[event reducer] All events loaded',
      eventClearCalendarStore: '[event reducer] Clear calendar object from state',

      authChecking: '[auth reducer] Checking login state',
      authCheckingFinish: '[auth reducer] Finish checking login state',

      // authStartLogin: '[auth reducer] Start login',
      authLogin: '[auth reducer] Login',

      // authStartRegister: '[auth reducer] Start register',
      // authStartTokenRenew: '[auth reducer] Start token renew',
      authLogout: '[auth reducer] Logout'
    } );

  } );


} );
