import { connect } from 'react-redux';
import { getDefinitions } from '../actions';
import App from '../components/App';

const mapDispatchToProps = dispatch => ({
  getDefinitions: word => {
    if (word.length > 0) {
      dispatch(getDefinitions(word.toLowerCase().trim()));
    }
  },
});

const AppContainer = connect(
  null,
  mapDispatchToProps,
)(App);

export default AppContainer;
