import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getDefinitions, appStarted, setUser } from '../actions';
import App from '../components/App';

const mapDispatchToProps = dispatch => ({
  getDefinitions: word => {
    if (word.length > 0) {
      dispatch(getDefinitions(word.toLowerCase().trim()));
    }
  },
  appStarted: () => dispatch(appStarted()),
  setUser: (name, uid) => {
    dispatch(setUser(name, uid));
  }
});

const AppContainer = withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);

export default AppContainer;
