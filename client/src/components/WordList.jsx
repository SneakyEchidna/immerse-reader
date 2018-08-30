import React from 'react';
import uuid from 'uuid';

class WordList extends React.Component {
  componentDidMount() {
    this.props.loadWordList();
  }
  renderWordlist() {
    if (this.props.wordlist) {
      return (
        <ul>
          {Object.entries(this.props.wordlist).map(([word, definitions]) => (
            <li key={uuid()}>
              {word}
              <ul>{definitions.map(def => <li key={uuid()}>{def}</li>)}</ul>
            </li>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  }
  render() {
    return this.renderWordlist();
  }
}

export default WordList;
