import { connect } from 'react-redux';
import Definitions from '../components/Definitions';

const mapStateToProps = state => ({
  definitions: state.definition.definitions,
  word: state.definition.word,
  loading: state.definition.loading,
});

const DefinitionsContainer = connect(mapStateToProps)(Definitions);

export default DefinitionsContainer;
