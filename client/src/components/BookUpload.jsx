import React from 'react';

class BookUpload extends React.Component {
  state = { author: null, name: null, file: null };
  fileRef = React.createRef();
  handleChange = ({ target }) => {
    this.setState(state => ({ ...state, [target.name]: target.value }));
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = new FormData();

    data.append('name', this.state.name);
    data.append('author', this.state.author);
    data.append('file', this.fileRef.current.files[0]);
    this.props.uploadBook(data);
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" onChange={this.handleChange} />
        <input type="text" name="author" onChange={this.handleChange} />
        <input type="file" name="file" ref={this.fileRef} />
        <button>Upload</button>
      </form>
    );
  }
}

export default BookUpload;
