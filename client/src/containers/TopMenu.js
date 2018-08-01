import { connect } from 'react-redux';
import { signIn, signOut, setUser } from '../actions';
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
});
const mapStateToProps = ({ user: { userName }, user: { uid } }) => ({
  userName,
  uid,
});

const TopMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopMenu);

export default TopMenuContainer;
