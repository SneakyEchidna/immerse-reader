import React from 'react';
import { Container, Header } from 'semantic-ui-react';

const Welcome = () => (
  <Container
    text
    textAlign="center"
    style={{ paddingTop: '5%', fontSize: '4vw' }}
  >
    <Header>Welcome to immerse reader</Header>
    <p>To use this app you need to log in first.</p>
  </Container>
);

export default Welcome;
