import React from 'react';
import { List, Container, Loader, Header } from 'semantic-ui-react';
import uuid from 'uuid';

const Definitions = ({ loading, definitions, word }) => {
  return (
    <div>
      {loading ? <Loader active /> : null}
      {definitions ? (
        <Container>
          <Header as="h3" dividing>
            {word}
          </Header>
          <List ordered>
            {definitions.map(e => <List.Item key={uuid()}>{e}</List.Item>)}
          </List>
        </Container>
      ) : null}
    </div>
  );
};

export default Definitions;
