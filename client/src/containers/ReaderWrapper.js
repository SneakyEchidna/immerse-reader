import { connect } from 'react-redux';
import ReaderWrapper from '../components/ReaderWrapper';
import { toggleDefinition } from '../actions';

const mapStateToProps = state => ({
  showDefinition: state.definition.showDefinition
});
const mapDispatchToProps = dispatch => ({
  toggleDefinition: () => dispatch(toggleDefinition())
});

const ReaderWrapperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReaderWrapper);

export default ReaderWrapperContainer;
