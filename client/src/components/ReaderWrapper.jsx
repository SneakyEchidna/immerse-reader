import React from 'react';
import Reader from '../containers/Reader';
import Definitions from '../containers/Definitions';
import { Grid, GridColumn } from 'semantic-ui-react';

const ReaderWrapper = () => (
  <Grid
    divided
    style={{
      position: 'absolute',
      height: '90%',
    }}
  >
    <GridColumn width={11}>
      <Reader />
    </GridColumn>
    <GridColumn width={5}>
      <Definitions />
    </GridColumn>
  </Grid>
);

export default ReaderWrapper;
