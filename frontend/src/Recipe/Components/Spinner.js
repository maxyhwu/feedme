import React from 'react';
import { BeatLoader, PacmanLoader } from 'react-spinners';

function Spinner() {
  return (
    <div className="spinner-container">
      <PacmanLoader color={'#db7be0'} loading={true} />
    </div>
  );
}

export default Spinner;