import React, { ReactNode } from 'react';

interface CenteredContainerProps {
  children: ReactNode;
}

const CenteredContainer: React.FC<CenteredContainerProps> = ({ children }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      flexDirection: 'column',
    }}
  >
    {children}
  </div>
);

export default CenteredContainer;
