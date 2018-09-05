import { connect } from 'react-redux';
import Definitions from '../components/Definitions';
import { addWordToWordList } from '../actions';

const mapStateToProps = state => ({
  definitions: state.definition.definitions,
  word: state.definition.word,
  loading: state.definition.loading
});
const mapDispatchToProps = dispatch => ({
  addWord: (word, definitions) => dispatch(addWordToWordList(word, definitions))
});

const DefinitionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Definitions);

export default DefinitionsContainer;
