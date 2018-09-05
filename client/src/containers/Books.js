import { connect } from 'react-redux';
import { loadBooksList, openBook } from '../actions';
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
  }
});
const BooksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Books);

export default BooksContainer;
