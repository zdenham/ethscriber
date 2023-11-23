'use client';

import React, { useEffect, useRef } from 'react';
import { ascii } from './art';
import { AsciiMorph } from './morph';

const asciiArr = ascii.split('\n');

var asciis = [asciiArr];

const Preloader: React.FC = () => {
  const ref = useRef(null);

  useEffect(() => {
    AsciiMorph(ref.current, { x: 10, y: 10 });
    AsciiMorph.morph(asciis[0]);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <pre
        style={{
          display: 'block',
          fontFamily: 'monospace',
          whiteSpace: 'pre',
          margin: '1em 0px',
          zIndex: 1000,
          fontSize: '0.5em',
        }}
        ref={ref}
      />
    </div>
  );
};

export default Preloader;
