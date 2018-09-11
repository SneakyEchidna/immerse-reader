import React, { Component } from 'react';
import { ReactReader } from '@sneakyechidna/react-reader';
import { Button } from 'semantic-ui-react';

class Reader extends Component {
  rendition = null;

  selection = (e, contents) => {
    if (contents) {
      const { getDefinitions } = this.props;
      getDefinitions(contents.window.getSelection().toString());
    }
  };

  getRendition = rendition => {
    const { fontSize } = this.props;
    this.rendition = rendition;
    rendition.themes.fontSize(`${fontSize}%`);
  };

  onToggleFontSize = direction => {
    if (direction === 'larger') {
      const { fontSize, setFontSize } = this.props;
      const nextSize = fontSize + 5;
      setFontSize(nextSize);
      this.setState({}, () => {
        this.rendition.themes.fontSize(`${nextSize}%`);
      });
    } else {
      const { fontSize, setFontSize } = this.props;
      const nextSize = fontSize - 5;
      setFontSize(nextSize);
      this.setState({}, () => {
        this.rendition.themes.fontSize(`${nextSize}%`);
      });
    }
  };

  customEvents = [
    { event: 'selected', callback: this.selection },
    { event: 'click', callback: this.props.sidebarEvent }
  ];

  locationChange = epubcfi => {
    const {
      setLocation,
      currentBook: { name }
    } = this.props;
    name && setLocation(epubcfi);
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
        getRendition={this.getRendition}
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
        <Button
          basic
          size="mini"
          compact
          style={{
            position: 'absolute',
            zIndex: '2',
            left: '30vw',
            top: '20px'
          }}
          onClick={() => this.onToggleFontSize('larger')}
        >
          +
        </Button>
        <Button
          basic
          size="mini"
          compact
          style={{
            position: 'absolute',
            zIndex: '2',
            right: '30vw',
            top: '20px'
          }}
          onClick={() => this.onToggleFontSize('smaller')}
        >
          -
        </Button>
        {currentBook && this.renderReader()}
      </div>
    );
  }
}
export default Reader;
