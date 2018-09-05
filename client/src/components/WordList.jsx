import React from 'react';
import uuid from 'uuid';

class WordList extends React.Component {
  componentDidMount() {
    const { loadWordList } = this.props;
    loadWordList();
  }

  renderWordlist() {
    const { wordlist } = this.props;
    if (wordlist) {
      return (
        <ul>
          {Object.entries(wordlist).map(([word, definitions]) => (
            <li key={uuid()}>
              {word}
              <ul>
                {definitions.map(def => (
                  <li key={uuid()}>{def}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  }

  render() {
    return this.renderWordlist();
  }
}

export default WordList;
