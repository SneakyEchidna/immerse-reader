import React, { Component } from 'react';
import { ReactReader } from 'react-reader';
import { debounce } from '../utils';

class Reader extends Component {
  rend = null;

  componentDidMount() {
    this.loadEvents();
    window.addEventListener(
      'resize',
      debounce(() => {
        this.loadEvents();
      }, 2000)
    );
  }

  getRendition = rend => {
    this.rend = rend;
  };

  locationChange = epubcfi => {
    const {
      identifier,
      eventsLoaded,
      setIdentifier,
      bookLoaded,
      setLocation,
      eventsLoadedEvent,
      bookLoadedEvent
    } = this.props;

    this.loadEvents();
    if (!identifier) setIdentifier(this.rend.book.package.metadata.identifier);
    if (eventsLoaded) setLocation(epubcfi);
    if (this.rend.getContents()[0] && !eventsLoaded) bookLoadedEvent();
    if (bookLoaded && !eventsLoaded) {
      eventsLoadedEvent();
    }
  };

  loadEvents = () => {
    const { getDefinitions } = this.props;
    const addEvents = () => {
      const iframe = this.rend.getContents()[0].window;
      iframe.onmouseup = null;
      const mouseup = () => {
        getDefinitions(iframe.getSelection().toString());
      };
      iframe.onmouseup = mouseup;
    };
    if (this.rend) {
      addEvents();
    } else setTimeout(this.loadEvents, 2000);
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
