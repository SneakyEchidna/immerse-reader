import React from 'react';
import { List, Container, Loader } from 'semantic-ui-react';
import uuid from 'uuid';

const Definitions = ({ loading, definitions }) => {
  return (
    <div>
      {loading ? <Loader active /> : null}
      {definitions ? (
        <Container>
          <List ordered>
            {definitions.map(e => <List.Item key={uuid()}>{e}</List.Item>)}
          </List>
        </Container>
      ) : null}
    </div>
  );
};

export default Definitions;
