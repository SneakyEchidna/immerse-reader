import { connect } from 'react-redux';
import { getDefinitions, appStarted } from '../actions';
import App from '../components/App';

const mapDispatchToProps = dispatch => ({
  getDefinitions: word => {
    if (word.length > 0) {
      dispatch(getDefinitions(word.toLowerCase().trim()));
    }
  },
  appStarted: () => dispatch(appStarted()),
});

const AppContainer = connect(
  null,
  mapDispatchToProps,
)(App);

export default AppContainer;
