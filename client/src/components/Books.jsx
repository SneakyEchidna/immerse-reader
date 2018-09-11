import React from 'react';
import {
  List,
  Icon,
  Button,
  Sidebar,
  Segment,
  Container
} from 'semantic-ui-react';
import BookUpload from '../containers/BookUpload';

class Books extends React.Component {
  sidebarRef = React.createRef();

  componentDidMount() {
    const { loadBooksList } = this.props;
    window.addEventListener('mousedown', this.handleClickOutside);
    loadBooksList();
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = event => {
    const { toggleBookUpload, showBookUpload } = this.props;
    if (
      showBookUpload &&
      this.sidebarRef &&
      !this.sidebarRef.current.ref.contains(event.target)
    ) {
      toggleBookUpload();
    }
  };

  renderBookslist() {
    const { booksList, openBook, deleteBook, history } = this.props;
    if (booksList.length > 0) {
      return (
        <List label="books" celled verticalAlign="middle">
          {booksList.map(book => (
            <List.Item key={book.key} name={book.name} author={book.author}>
              <List.Content floated="right">
                <Button onClick={() => deleteBook(book.key)} negative compact>
                  x
                </Button>
              </List.Content>
              <Icon circular name="book" />
              <List.Content className="content">
                <List.Header
                  as="a"
                  onClick={() => {
                    openBook(book);
                    setTimeout(history.push, 1000, '/reader');
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
    const { showBookUpload, toggleBookUpload } = this.props;
    return (
      <Sidebar.Pushable as={Segment} vertical>
        <Sidebar
          as={Segment}
          animation="overlay"
          icon="labeled"
          inverted
          direction="right"
          visible={showBookUpload}
          ref={this.sidebarRef}
        >
          <BookUpload />
        </Sidebar>
        <Sidebar.Pusher>
          <Segment
            as={Container}
            basic
            style={{
              height: '100vh',
              width: '100vw',
              padding: '10px 0 0 0'
            }}
          >
            <Button onClick={toggleBookUpload}>Upload Book</Button>
            {this.renderBookslist()}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default Books;
