import React, { Component } from 'react';
import { ReactReader } from 'react-reader';
import { debounce } from '../utils';

class Reader extends Component {
  // componentDidMount() {
  //   setTimeout(this.loadEvents, 3000);
  //   window.addEventListener(
  //     'resize',
  //     debounce(() => {
  //       setTimeout(this.loadEvents, 2000);
  //     }, 2000),
  //   );
  // }
  rend = null;
  getRendition = rend => {
    this.rend = rend;
  };
  locationChange = epubcfi => {
    this.loadEvents();
    if (!this.props.identifier)
      this.props.setIdentifier(this.rend.book.package.metadata.identifier);
    if (this.props.eventsLoaded) this.props.setLocation(epubcfi);
    if (this.rend.getContents()[0] && !this.props.eventsLoaded)
      this.props.bookLoadedEvent();
    if (this.props.bookLoaded && !this.props.eventsLoaded) {
      this.props.eventsLoadedEvent();
    }
  };
  loadEvents = () => {
    const iframe = this.rend.getContents()[0].window;
    iframe.onmouseup = null;
    const mouseup = () => {
      this.props.getDefinitions(iframe.getSelection().toString());
    };
    iframe.onmouseup = mouseup;
  };
  renderLocation() {
    if (this.props.location) return { location: this.props.location };
  }
  renderReader() {
    return (
      <ReactReader
        url={this.props.currentBook.url}
        title={this.props.currentBook.name}
        {...this.renderLocation()}
        locationChanged={this.locationChange}
        getRendition={this.getRendition}
      />
    );
  }
  render() {
    return (
      <div
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
        }}
      >
        {this.props.currentBook && this.renderReader()}
      </div>
    );
  }
}
export default Reader;
