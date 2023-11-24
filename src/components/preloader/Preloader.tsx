'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ascii } from './art';
import { AsciiMorph } from './morph';

const asciiArr = ascii.split('\n');

var asciis = [asciiArr];

const Preloader: React.FC = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [isAnimateOut, setIsAnimateOut] = useState(false);

  useEffect(() => {
    async function runAnimation() {
      AsciiMorph(ref.current, { x: 50, y: 50 });
      await AsciiMorph.morph(asciis[0], 500);
      setIsAnimateOut(true);
    }

    runAnimation();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        background: 'white',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
      className={isAnimateOut ? 'container' : ''}
    >
      <pre
        style={{
          display: 'block',
          fontFamily: 'monospace',
          whiteSpace: 'pre',
          margin: '1em 0px',
          zIndex: 1000,
          fontSize: '8px',
        }}
        ref={ref}
      />
      <style jsx>{`
        .container {
          animation: fade-out 0.5s ease-out;
          animation-fill-mode: forwards;
        }

        @keyframes fade-out {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
