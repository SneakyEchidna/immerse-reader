import React from 'react';
import { Container, Divider } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import ReaderWrapper from './ReaderWrapper';
import WordList from '../containers/WordList';
import Books from '../containers/Books';
import TopMenu from '../containers/TopMenu';
import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {
  componentDidMount() {
    const { appStarted } = this.props;
    appStarted();
  }

  render() {
    return (
      <Container>
        <TopMenu />
        <Divider />
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
