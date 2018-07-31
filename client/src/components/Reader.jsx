import React, { Component } from 'react';
import { ReactReader } from 'react-reader';
import { debounce } from '../utils/';

class Reader extends Component {
  componentDidMount() {
    window.addEventListener(
      'resize',
      debounce(() => {
        setTimeout(this.loadEvents, 2000);
      }, 2000),
    );
  }
  rend = null;
  getRendition = rend => {
    this.rend = rend;
  };
  locationChange = epubcfi => {
    if (!this.props.identifier)
      this.props.setIdentifier(this.rend.book.package.metadata.identifier);
    this.props.setLocation(epubcfi);
    if (this.rend.getContents()[0] && !this.props.eventsLoaded)
      this.props.bookLoadedEvent();
    if (this.props.bookLoaded && !this.props.eventsLoaded) {
      this.loadEvents();
      this.props.eventsLoadedEvent();
    }
  };
  loadEvents = () => {
    const iframe = this.rend.getContents()[0].window;
    iframe.onmouseup = null;
    const mouseup = () => {
      this.props.getDefinitions(iframe.getSelection().toString());
    };
    iframe.addEventListener('mouseup', mouseup, true);
  };
  renderLocation() {
    this.props.location && { location: this.props.location };
  }
  render() {
    return (
      <div
        style={{
          position: 'relative',
          height: '100%',
          width: '80%',
        }}
      >
        <ReactReader
          url={'/moby.epub'}
          title={'Moby Dick'}
          {...this.renderLocation()}
          locationChanged={this.locationChange}
          getRendition={this.getRendition}
        />
      </div>
    );
  }
}
export default Reader;
