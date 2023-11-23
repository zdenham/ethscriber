'use client';

import React, { useEffect, useRef } from 'react';
import { ascii } from './art';
import { AsciiMorph } from './morph';

const asciiArr = ascii.split('\n');

var asciis = [asciiArr];

const Preloader: React.FC = () => {
  const ref = useRef(null);

  useEffect(() => {
    AsciiMorph(ref.current, { x: 51, y: 28 });

    AsciiMorph.morph(asciis[0]);
  }, []);

  return (
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
  );
};

export default Preloader;
