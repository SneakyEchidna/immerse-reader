import React from 'react';
import { Form, Input } from 'semantic-ui-react';

class BookUpload extends React.Component {
  state = { author: '', name: '' };
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
    this.setState = { author: '', name: '' };
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
          />
          <Form.Input
            label="Author"
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.handleChange}
          />
          <input type="file" name="file" ref={this.fileRef} />
        </Form.Group>
        <Form.Button>Upload</Form.Button>
      </Form>
    );
  }
}

export default BookUpload;
