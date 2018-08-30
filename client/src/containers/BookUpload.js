import { connect } from 'react-redux';
import { uploadBook } from '../actions';
import BookUpload from '../components/BookUpload';

const mapDispatchToProps = dispatch => ({
  uploadBook: data => {
    dispatch(uploadBook(data));
  },
});
const BookUploadContainer = connect(
  null,
  mapDispatchToProps,
)(BookUpload);

export default BookUploadContainer;
