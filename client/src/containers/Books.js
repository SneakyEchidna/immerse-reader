import { connect } from 'react-redux';
import {
  loadBooksList,
  openBook,
  deleteBook,
  toggleBookUpload
} from '../actions';
import Books from '../components/Books';

const mapStateToProps = ({
  books: { booksList },
  books: { showBookUpload }
}) => ({
  booksList,
  showBookUpload
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
  },
  toggleBookUpload: () => {
    dispatch(toggleBookUpload());
  }
});
const BooksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Books);

export default BooksContainer;
