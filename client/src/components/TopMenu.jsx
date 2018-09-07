import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class TopMenu extends Component {
  static isActive(location) {
    const hash = window.location.hash.substr(1);
    if (hash === location) {
      return true;
    }
    return false;
  }

  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  loginButton() {
    const { uid, signIn, signOut } = this.props;
    if (uid) {
      return <Menu.Item name="log out" onClick={signOut} />;
    }
    return <Menu.Item name="log in" onClick={signIn} />;
  }

  render() {
    const { uid, userName } = this.props;
    return (
      <div>
        <Menu pointing secondary>
          {uid && (
            <React.Fragment>
              <Menu.Item
                as={Link}
                to="/"
                name="home"
                active={TopMenu.isActive('/')}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                as={Link}
                to="/wordList"
                name="word list"
                active={TopMenu.isActive('/wordList')}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                as={Link}
                to="/books"
                name="books"
                active={TopMenu.isActive('/books')}
                onClick={this.handleItemClick}
              />
            </React.Fragment>
          )}
          <Menu.Menu position="right">
            <Menu.Item name="toggle" onClick={this.props.toggleDefinition} />
            {userName && <Menu.Item name={`Logged as ${userName}`} />}
            {this.loginButton()}
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
