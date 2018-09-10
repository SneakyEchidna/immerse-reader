import React from 'react';
import { Container, Loader } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import TopMenu from '../containers/TopMenu';
import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {
  componentDidMount() {
    const { appStarted } = this.props;
    appStarted();
    fetch('http://localhost:8765', {
      method: 'POST',
      body: JSON.stringify({ action: 'deckNames', version: 6 })
    }).then(e => console.log(e.json()));
  }

  render() {
    const WordList = Loadable({
      loader: () => import('../containers/WordList'),
      loading: () => <Loader active />
    });
    const ReaderWrapper = Loadable({
      loader: () => import('../containers/ReaderWrapper'),
      loading: () => <Loader active />
    });
    const Books = Loadable({
      loader: () => import('../containers/Books'),
      loading: () => <Loader active />
    });

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
          <Route exact path="/" component={ReaderWrapper} />
          <Route path="/wordlist" component={WordList} />
          <Route path="/books" component={Books} />
        </Switch>
      </Container>
    );
  }
}

export default App;
