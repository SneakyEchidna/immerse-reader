import React from 'react';
import Definitions from '../containers/Definitions';
import Reader from '../containers/Reader';
import TopMenu from '../containers/TopMenu';
import { Container, Divider, Grid, GridColumn } from 'semantic-ui-react';
import { firebase } from '../firebase';
import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {
  componentDidMount() {
    this.props.appStarted();
  }
  render() {
    return (
      <Container>
        <TopMenu />
        <Divider />
        <Grid
          divided
          style={{
            position: 'absolute',
            height: '90%',
          }}
        >
          <GridColumn
            width={11}
            onMouseUp={() =>
              this.props.getDefinitions(window.getSelection().toString())
            }
          >
            <Reader />
          </GridColumn>
          <GridColumn width={5} verticalAlign="middle">
            <Definitions />
          </GridColumn>
        </Grid>
      </Container>
    );
  }
}

export default App;
