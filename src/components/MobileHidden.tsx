'use client';

import React, { PropsWithChildren } from 'react';

const MobileHidden: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container">
      {children}
      <style jsx>{`
        @media (max-width: 768px) {
          .container {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileHidden;
