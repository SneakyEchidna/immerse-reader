import React from 'react';
import { Container, Loader } from 'semantic-ui-react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import TopMenu from '../containers/TopMenu';
import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {
  componentDidMount() {
    const { appStarted } = this.props;
    appStarted();
  }

  render() {
    const { uid } = this.props;
    const loading = <Loader active />;
    const WordList = Loadable({
      loader: () => import('../containers/WordList'),
      loading: () => loading
    });
    const ReaderWrapper = Loadable({
      loader: () => import('../containers/ReaderWrapper'),
      loading: () => loading
    });
    const Books = Loadable({
      loader: () => import('../containers/Books'),
      loading: () => loading
    });
    const Welcome = Loadable({
      loader: () => import('../components/Welcome'),
      loading: () => loading
    });
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          uid ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/'
              }}
            />
          )
        }
      />
    );
    const RedirectToBooks = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          !uid ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/books'
              }}
            />
          )
        }
      />
    );
    return (
      <Container fluid>
        <style>
          {`
        #root > .ui.container{
          height: 100vh;
          margin-left: 0px!important;
          margin-right: 0px!important;
        }
          
        `}
        </style>

        <TopMenu />
        <Switch>
          <RedirectToBooks exact path="/" component={Welcome} />
          <PrivateRoute path="/wordlist" component={WordList} />
          <PrivateRoute path="/books" component={Books} />
          <PrivateRoute path="/reader" component={ReaderWrapper} />
        </Switch>
      </Container>
    );
  }
}

export default App;
