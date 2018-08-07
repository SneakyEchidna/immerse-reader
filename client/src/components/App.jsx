import React from 'react';
import ReaderWrapper from '../components/ReaderWrapper';
import WordList from '../components/WordList';
import TopMenu from '../containers/TopMenu';
import { Container, Divider, Grid, GridColumn } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  componentDidMount() {
    this.props.appStarted();
  }
  render() {
    return (
      <Container>
        <TopMenu />
        <Divider />
        <Switch>
          <Route exact path="/" component={ReaderWrapper} />
          <Route path="/wordlist" component={WordList} />
        </Switch>
      </Container>
    );
  }
}

export default App;
