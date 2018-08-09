import React from 'react';
import uuid from 'uuid';
import BookUpload from '../containers/BookUpload';
import { List, Icon, Grid, Container, Label, Divider } from 'semantic-ui-react';

class Books extends React.Component {
  componentDidMount() {
    this.props.loadBooksList();
  }
  renderBookslist() {
    if (this.props.booksList.length > 0) {
      return (
        <List label="books" divided verticalAlign="middle">
          {this.props.booksList.map(book => (
            <List.Item key={uuid()} name={book.name} author={book.author}>
              <Icon circular name="book" />
              <List.Content className="content">
                <List.Header
                  as="a"
                  onClick={() => this.props.openBook(book)}
                >{`${book.name} - ${book.author}`}</List.Header>
              </List.Content>
            </List.Item>
          ))}
        </List>
      );
    } else {
      return (
        <List>
          <List.Item>There are no books to display</List.Item>
        </List>
      );
    }
  }
  render() {
    return (
      <Grid divided>
        <Grid.Column width={11}>{this.renderBookslist()}</Grid.Column>
        <Grid.Column width={5}>
          <BookUpload />
        </Grid.Column>
      </Grid>
    );
  }
}

export default Books;
