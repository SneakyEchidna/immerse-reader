import React, { Component } from 'react';
import { ReactReader } from '@sneakyechidna/react-reader';

class Reader extends Component {
  selection = (e, contents) => {
    if (contents) {
      const { getDefinitions } = this.props;
      getDefinitions(contents.window.getSelection().toString());
    }
  };

  customEvents = [{ event: 'selected', callback: this.selection }];

  locationChange = epubcfi => {
    const { setLocation } = this.props;
    setLocation(epubcfi);
  };

  renderLocation() {
    const { location } = this.props;
    if (location) return { location };
  }

  renderReader() {
    const {
      currentBook: { name },
      currentBook: { book }
    } = this.props;

    return (
      <ReactReader
        url={book}
        title={name}
        {...this.renderLocation()}
        locationChanged={this.locationChange}
        renditionOn={this.customEvents}
      />
    );
  }

  render() {
    const { currentBook } = this.props;
    return (
      <div
        style={{
          position: 'relative',
          height: '100%',
          width: '100%'
        }}
      >
        {currentBook && this.renderReader()}
      </div>
    );
  }
}
export default Reader;
