'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ascii } from './art';
import { AsciiMorph } from './morph';
import { delay } from '../../utils/delay';

const asciiArr = ascii.split('\n');

var asciis = [asciiArr];

const Preloader: React.FC = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [isAnimateOut, setIsAnimateOut] = useState(false);

  useEffect(() => {
    async function runAnimation() {
      AsciiMorph(ref.current, { x: 50, y: 50 });
      await AsciiMorph.morph(asciis[0], 1000);
      await delay(50);
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
        width: '120vw',
        height: '120vh',
        top: '-10vh',
        left: '-10vw',
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
          animation: fade-out 0.5s cubic-bezier(1, -0.66, 0.62, -0.1);
          animation-fill-mode: forwards;
        }

        @keyframes fade-out {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
