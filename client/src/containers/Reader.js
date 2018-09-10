import { connect } from 'react-redux';
import {
  getDefinitions,
  eventsLoaded,
  bookLoaded,
  setIdentifier,
  setLocation,
  setFontSize
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
  setFontSize: size => {
    dispatch(setFontSize(size));
  }
});
const mapStateToProps = state => ({
  bookLoaded: state.reader.bookLoaded,
  eventsLoaded: state.reader.eventsLoaded,
  location: state.reader.location,
  identifier: state.reader.identifier,
  currentBook: state.books.currentBook,
  fontSize: state.reader.fontSize
});

const ReaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Reader);

export default ReaderContainer;
