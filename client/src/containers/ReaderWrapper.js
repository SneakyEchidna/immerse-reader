import { connect } from 'react-redux';
import ReaderWrapper from '../components/ReaderWrapper';

const mapStateToProps = state => ({
  showDefinition: state.definition.showDefinition
});

const ReaderWrapperContainer = connect(mapStateToProps)(ReaderWrapper);

export default ReaderWrapperContainer;
