import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { auth } from '../firebase';
import Db from '../api';

export default class TopMenu extends Component {
  constructor() {
    super();
    this.auth = auth;
    this.db = new Db();
  }

  state = { activeItem: 'home' };
  signIn = () => {
    this.auth
      .authWithGoogle()
      .then(result => {
        const user = result.user;
        this.db.addUser(user.uid, user.displayName, user.email, user.photoURL);
        this.props.setUser(user.displayName, user.uid);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  signOut = () => {
    this.auth.signOut().then(this.props.setUser(null, null));
  };
  loginButton() {
    if (this.props.uid) {
      return <Menu.Item name="log out" onClick={this.signOut} />;
    } else {
      return <Menu.Item name="log in" onClick={this.signIn} />;
    }
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            {this.props.userName && (
              <Menu.Item
                name={`Logged as ${this.props.userName}`}
                active={activeItem === 'logout'}
                onClick={this.signIn}
              />
            )}
            {this.loginButton()}
            {/* <Menu.Item
              name="log in"
              active={activeItem === 'logout'}
              onClick={this.signIn}
            /> */}
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
