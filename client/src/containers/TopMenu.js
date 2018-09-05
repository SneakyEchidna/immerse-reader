import { connect } from 'react-redux';
import { signIn, signOut, setUser, loadWordList } from '../actions';
import TopMenu from '../components/TopMenu';

const mapDispatchToProps = dispatch => ({
  signIn: () => {
    dispatch(signIn());
  },
  signOut: () => {
    dispatch(signOut());
  },
  setUser: (name, uid) => {
    dispatch(setUser(name, uid));
  },
  loadWordList: () => {
    dispatch(loadWordList());
  }
});
const mapStateToProps = ({ user: { userName }, user: { uid } }) => ({
  userName,
  uid
});

const TopMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopMenu);

export default TopMenuContainer;
