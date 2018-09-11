import React, { Component } from 'react';
import { Segment, Sidebar } from 'semantic-ui-react';
import Reader from '../containers/Reader';
import Definitions from '../containers/Definitions';

class ReaderWrapper extends Component {
  sidebarRef = React.createRef();

  componentDidMount() {
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = event => {
    const { toggleDefinition, showDefinition } = this.props;
    if (
      showDefinition &&
      this.sidebarRef &&
      !this.sidebarRef.current.ref.contains(event.target)
    ) {
      toggleDefinition();
    }
  };

  render() {
    const { showDefinition } = this.props;
    return (
      <Sidebar.Pushable as={Segment} vertical>
        <Sidebar
          as={Segment}
          animation="overlay"
          icon="labeled"
          inverted
          direction="right"
          visible={showDefinition}
          ref={this.sidebarRef}
        >
          <Definitions />
        </Sidebar>
        <Sidebar.Pusher>
          <Segment
            basic
            style={{
              height: '100vh',
              width: '100vw',
              padding: '0'
            }}
          >
            <Reader sidebarEvent={this.handleClickOutside} />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default ReaderWrapper;
