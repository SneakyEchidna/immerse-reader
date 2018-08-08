import { connect } from 'react-redux';
import { loadBooksList } from '../actions';
import Books from '../components/Books';

const mapStateToProps = ({ books: { booksList } }) => ({
  booksList,
});

const mapDispatchToProps = dispatch => ({
  loadBooksList: () => {
    dispatch(loadBooksList());
  },
});
const BooksContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Books);

export default BooksContainer;
