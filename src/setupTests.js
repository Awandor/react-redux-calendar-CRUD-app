import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';


Enzyme.configure( { adapter: new Adapter() } );

expect.addSnapshotSerializer( createSerializer( { mode: 'deep' } ) );

// Para que no falle el test de CalendarModal.test.jsx

HTMLCanvasElement.prototype.getContext = () => {};
