import React from 'react';
import Definitions from '../containers/Definitions';
import Reader from '../containers/Reader';

const App = ({ getDefinitions }) => {
  return (
    <div
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        display: 'flex',
      }}
      onMouseUp={() => getDefinitions(window.getSelection().toString())}
    >
      <Reader />
      <Definitions />
    </div>
  );
};

export default App;
