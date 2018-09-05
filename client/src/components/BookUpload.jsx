import React from 'react';
import { Form } from 'semantic-ui-react';
import { Storage } from '../api';

class BookUpload extends React.Component {
  storage = new Storage();

  state = { author: '', name: '' };
  fileRef = React.createRef();
  handleChange = ({ target }) => {
    this.setState(state => ({ ...state, [target.name]: target.value }));
  };
  handleSubmit = event => {
    event.preventDefault();
    const name = this.state.name;
    const author = this.state.author;
    const book = {
      name,
      author,
      file: this.fileRef.current.files[0],
    };
    this.props.uploadBook(book);
    this.setState({ author: '', name: '' });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group grouped>
          <Form.Input
            label="Book name"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <Form.Input
            label="Author"
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.handleChange}
            required
          />
          <input type="file" name="file" ref={this.fileRef} accept=".epub" />
        </Form.Group>
        <Form.Button>Upload</Form.Button>
      </Form>
    );
  }
}

export default BookUpload;
