import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { evmChains } from './evmChains';

const walletConnectProjectId = '176492253f1830f33ad81110be200648';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  evmChains,
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Text Ethscripter',
  chains,
  projectId: walletConnectProjectId,
});

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { chains };
