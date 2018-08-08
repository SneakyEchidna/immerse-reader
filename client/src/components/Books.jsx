import React from 'react';
import uuid from 'uuid';
import BookUpload from '../containers/BookUpload';

class Books extends React.Component {
  componentDidMount() {
    this.props.loadBooksList();
  }
  renderBookslist() {
    if (this.props.booksList) {
      return (
        <ul>
          {this.props.booksList.map(book => <li key={uuid()}>{book}</li>)}
        </ul>
      );
    } else {
      return <div>There are no books to display</div>;
    }
  }
  render() {
    return (
      <div>
        <ul>
          {this.props.booksList.map(book => <li key={uuid()}>{book}</li>)}
        </ul>
        <BookUpload />
      </div>
    );
  }
}

export default Books;
