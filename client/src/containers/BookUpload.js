import { connect } from 'react-redux';
import { uploadBook } from '../actions';
import BookUpload from '../components/BookUpload';

const mapDispatchToProps = dispatch => ({
  uploadBook: data => {
    dispatch(uploadBook(data));
  }
});
const mapStateToProps = state => ({
  loading: state.books.loading
});
const BookUploadContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookUpload);

export default BookUploadContainer;
