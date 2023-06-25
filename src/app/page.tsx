import CenteredContainer from '../components/CenteredContainer';
import { ConnectButton } from '../components/ConnectButton';
import { Ethscribe } from '../components/Ethscribe';

export function Page() {
  return (
    <>
      <div style={{ position: 'fixed', top: 10, right: 10 }}>
        <ConnectButton />
      </div>
      <CenteredContainer>
        <h2 style={{ fontFamily: '"Roboto", sans-serif' }}>Ethscriber</h2>
        <div
          style={{
            fontFamily: '"Roboto", sans-serif',
            marginBottom: 25,
            textAlign: 'center',
          }}
        >
          A simple tool to inscribe text ethscriptions by{' '}
          <a href="https://twitter.com/zac_denham">zacque.eth</a>.
        </div>
        <Ethscribe />
      </CenteredContainer>
    </>
  );
}

export default Page;
