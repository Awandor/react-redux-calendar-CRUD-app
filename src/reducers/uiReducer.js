import { types } from "../types/types";

const initialState = {
  modalIsOpen: false
};

// Es importante que el state no sea undefined por ello lo inicializamos

export const uiReducer = ( state = initialState, action ) => {

  // console.log( 'uiReducer', action );

  switch ( action.type ) {
    case types.uiOpenModalAction:

      return {
        ...state,
        modalIsOpen: true
      };

    case types.uiCloseModalAction:

      return {
        ...state,
        modalIsOpen: false
      };

    default:
      return state;
  }

};
