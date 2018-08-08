import React from 'react';
import uuid from 'uuid';
import BookUpload from '../containers/BookUpload';
import { List } from 'semantic-ui-react';

class Books extends React.Component {
  componentDidMount() {
    this.props.loadBooksList();
  }
  renderBookslist() {
    if (this.props.booksList.length > 0) {
      return (
        <List divided verticalAlign="middle">
          {this.props.booksList.map(book => (
            <List.Item key={uuid()} name={book.name} author={book.author}>
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
      return <div>There are no books to display</div>;
    }
  }
  render() {
    return (
      <div>
        {this.renderBookslist()}
        <BookUpload />
      </div>
    );
  }
}

export default Books;
