import React from 'react';
import uuid from 'uuid';

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
      <ul>{this.props.booksList.map(book => <li key={uuid()}>{book}</li>)}</ul>
    );
  }
}

export default Books;
