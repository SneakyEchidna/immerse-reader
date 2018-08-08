import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class TopMenu extends Component {
  state = { activeItem: 'home' };
  loginButton() {
    if (this.props.uid) {
      return <Menu.Item name="log out" onClick={this.props.signOut} />;
    } else {
      return <Menu.Item name="log in" onClick={this.props.signIn} />;
    }
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  isActive(location) {
    const hash = window.location.hash.substr(1);
    if (hash === location) {
      return true;
    } else return false;
  }
  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={this.isActive('/')}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/wordList"
            name="word list"
            active={this.isActive('/wordList')}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/books"
            name="books"
            active={this.isActive('/books')}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            {this.props.userName && (
              <Menu.Item name={`Logged as ${this.props.userName}`} />
            )}
            {this.loginButton()}
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
