import React from 'react';
import Definitions from '../containers/Definitions';
import Reader from './Reader';

const App = ({ getDefinitions }) => {
  return (
    <div onMouseUp={() => getDefinitions(window.getSelection().toString())}>
      <Reader />
      <Definitions />
    </div>
  );
};

export default App;
