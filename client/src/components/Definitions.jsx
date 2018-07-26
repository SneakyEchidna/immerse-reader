import React from 'react';
import Spiner from './Spiner';
import uuid from 'uuid';

const Definitions = ({ loading, definitions }) => {
  return (
    <div className="definitions">
      {loading ? <Spiner /> : null}
      {definitions ? (
        <ul>{definitions.map(e => <li key={uuid()}>{e}</li>)}</ul>
      ) : null}
    </div>
  );
};

export default Definitions;
