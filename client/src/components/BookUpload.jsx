import React from 'react';
import { Form } from 'semantic-ui-react';
import { Storage } from '../api';

class BookUpload extends React.Component {
  constructor() {
    super();
    this.state = { author: '', name: '' };
    this.storage = new Storage();
    this.fileRef = React.createRef();
  }

  handleChange = ({ target }) => {
    this.setState(state => ({ ...state, [target.name]: target.value }));
  };

  handleSubmit = event => {
    event.preventDefault();

    const { name, author } = this.state;
    const { uploadBook } = this.props;
    const book = {
      name,
      author,
      file: this.fileRef.current.files[0]
    };
    uploadBook(book);
    this.setState({ author: '', name: '' });
    event.target.reset();
  };

  render() {
    const { name, author } = this.state;
    const { loading } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} inverted>
        <Form.Group grouped>
          <Form.Input
            label="Book name"
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
          />
          <Form.Input
            label="Author"
            type="text"
            name="author"
            value={author}
            onChange={this.handleChange}
            required
          />
          <input
            type="file"
            name="file"
            ref={this.fileRef}
            accept=".epub"
            required
          />
        </Form.Group>
        <Form.Button loading={loading}>Upload</Form.Button>
      </Form>
    );
  }
}

export default BookUpload;
