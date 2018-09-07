import React from 'react';
import { Segment, Sidebar } from 'semantic-ui-react';
import Reader from '../containers/Reader';
import Definitions from '../containers/Definitions';

const ReaderWrapper = ({ showDefinition }) => (
  <Sidebar.Pushable as={Segment} vertical>
    <Sidebar
      as={Segment}
      animation="overlay"
      icon="labeled"
      inverted
      direction="right"
      visible={showDefinition}
      width="wide"
    >
      <Definitions />
    </Sidebar>
    <Sidebar.Pusher>
      <Segment
        basic
        style={{
          height: '90vh',
          width: '100vw'
        }}
      >
        <Reader />
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

export default ReaderWrapper;
