import React from 'react';
import { BeatLoader, PacmanLoader } from 'react-spinners';

function Spinner() {
  return (
    <div className="spinner-container">
      <PacmanLoader color={'#E3DBF0'} loading={true} size={20} />
    </div>
  );
}

export default Spinner;