import { connect } from 'react-redux';
import {
  getDefinitions,
  eventsLoaded,
  bookLoaded,
  setIdentifier,
  setLocation,
} from '../actions';
import Reader from '../components/Reader';

const mapDispatchToProps = dispatch => ({
  getDefinitions: word => {
    if (word.length > 0) {
      dispatch(getDefinitions(word.toLowerCase().trim()));
    }
  },
  bookLoadedEvent: () => {
    dispatch(bookLoaded());
  },
  eventsLoadedEvent: () => {
    dispatch(eventsLoaded());
  },
  setIdentifier: id => {
    dispatch(setIdentifier(id));
  },
  setLocation: loc => {
    dispatch(setLocation(loc));
  },
});
const mapStateToProps = state => ({
  bookLoaded: state.reader.bookLoaded,
  eventsLoaded: state.reader.eventsLoaded,
  location: state.reader.location,
  identifier: state.reader.identifier,
});

const ReaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reader);

export default ReaderContainer;
