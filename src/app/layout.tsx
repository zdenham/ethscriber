import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Ethscriber',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
