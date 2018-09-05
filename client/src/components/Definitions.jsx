import React from 'react';
import { List, Container, Loader, Header, Button } from 'semantic-ui-react';
import uuid from 'uuid';

const Definitions = ({ loading, definitions, word, addWord }) => (
  <Container
    style={{
      position: 'relative',
      height: '90%'
    }}
  >
    {loading ? <Loader active /> : null}
    {definitions ? (
      <Container>
        {word ? (
          <Header as="h3" dividing>
            {word}
            <Button
              size="mini"
              compact
              onClick={() => addWord(word, definitions)}
            >
              +
            </Button>
          </Header>
        ) : null}

        <List ordered>
          {definitions.map(e => (
            <List.Item key={uuid()}>
              <List.Content>{e}</List.Content>
            </List.Item>
          ))}
        </List>
      </Container>
    ) : null}
  </Container>
);

export default Definitions;
