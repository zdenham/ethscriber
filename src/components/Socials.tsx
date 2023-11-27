'use client';

import React from 'react';
import Discord from './logo/Discord';
import Twitter from './logo/Twitter';

const Socials: React.FC = () => {
  return (
    <div>
      <div className={`socials`}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex' }}>
            <a
              href="https://discord.gg/RdSj9ZFA"
              target="_blank"
              rel="noopener noreferrer"
              className="socialLink"
            >
              <Discord size={22} />
            </a>
            <a
              href="https://x.com/ethscriber"
              target="_blank"
              rel="noopener noreferrer"
              className="socialLink"
            >
              <Twitter size={18} />
            </a>
          </div>
          <p style={{ fontFamily: 'monospace' }}>(New!) Follow Ethscriber</p>
        </div>
        <style jsx>{`
          .socials {
            display: flex;
            width: 100vw;
            z-index: 2;
            position: fixed;
            bottom: 0px;
            left: 0px;
            right: 0px;
            justify-content: center;
            align-items: center;
          }

          .socialLink {
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #818181;
            border-radius: 50%;
            margin: 10px 5px;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Socials;
