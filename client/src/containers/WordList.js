import { connect } from 'react-redux';
import { loadWordList } from '../actions';
import WordList from '../components/WordList';

const mapStateToProps = ({ wordlist: { wordlist } }) => ({
  wordlist,
});

const mapDispatchToProps = dispatch => ({
  loadWordList: () => {
    dispatch(loadWordList());
  },
});
const WordListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WordList);

export default WordListContainer;
