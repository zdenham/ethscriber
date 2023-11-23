import React from 'react';
import { ascii } from './art.js';

const Preloader: React.FC = () => {
  return (
    <div>
      <div
        style={{
          fontFamily: 'monospace',
        }}
      >
        {ascii}
      </div>
    </div>
  );
};

export default Preloader;
