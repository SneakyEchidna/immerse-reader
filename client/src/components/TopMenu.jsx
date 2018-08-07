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

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/wordList"
            name="word list"
            active={activeItem === 'word list'}
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
