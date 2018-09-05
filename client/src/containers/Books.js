import { connect } from 'react-redux';
import { loadBooksList, openBook, deleteBook } from '../actions';
import Books from '../components/Books';

const mapStateToProps = ({ books: { booksList } }) => ({
  booksList
});

const mapDispatchToProps = dispatch => ({
  loadBooksList: () => {
    dispatch(loadBooksList());
  },
  openBook: book => {
    dispatch(openBook(book));
  },
  deleteBook: key => {
    dispatch(deleteBook(key));
  }
});
const BooksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Books);

export default BooksContainer;
