import React from 'react';
import { List, Icon, Grid, Button } from 'semantic-ui-react';
import BookUpload from '../containers/BookUpload';

class Books extends React.Component {
  componentDidMount() {
    const { loadBooksList } = this.props;
    loadBooksList();
  }

  renderBookslist() {
    const { booksList, openBook, deleteBook, history } = this.props;
    if (booksList.length > 0) {
      return (
        <List label="books" celled verticalAlign="middle">
          {booksList.map(book => (
            <List.Item key={book.key} name={book.name} author={book.author}>
              <List.Content floated="right">
                <Button
                  onClick={() => deleteBook(book.key)}
                  negative
                  compact
                  circular
                >
                  x
                </Button>
              </List.Content>
              <Icon circular name="book" />
              <List.Content className="content">
                <List.Header
                  as="a"
                  onClick={() => {
                    openBook(book);
                    history.push('/');
                  }}
                >
                  {`${book.name} - ${book.author}`}
                </List.Header>
              </List.Content>
            </List.Item>
          ))}
        </List>
      );
    }
    return (
      <List>
        <List.Item>There are no books to display</List.Item>
      </List>
    );
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
