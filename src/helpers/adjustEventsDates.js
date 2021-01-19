import moment from "moment";

export const adjustEventsDates = ( events = [] ) => {

  return events.map( element => {

    return {
      ...element,
      start: moment( element.start ).toDate(),
      end: moment( element.end ).toDate()
    };

  } );

};
