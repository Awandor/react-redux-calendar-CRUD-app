import { useDispatch } from "react-redux";
import { uiOpenModalStoreAction } from "../../actions/uiActions";

export const AddNewFab = () => {

    // Necesitamos useDispatch para depachar Acciones

    const dispatch = useDispatch();

    const handleClickNewEvent = () => {

        console.log( 'Add' );

        dispatch( uiOpenModalStoreAction() );

    };

    return (
        <button className="btn btn-primary fab" onClick={handleClickNewEvent}><i className="fas fa-plus"></i></button>
    );

};