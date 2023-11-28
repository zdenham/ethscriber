import {
  arbitrum,
  avalanche,
  base,
  bsc,
  mainnet,
  optimism,
  polygon,
  canto,
  celo,
  fantom,
  Chain,
} from 'wagmi/chains';

const opBNBMainnet: Chain = {
  id: 204,
  network: 'opBNB',
  name: 'opBNB Mainnet',
  nativeCurrency: {
    name: 'Binance Coin',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://1rpc.io/opbnb'],
    },
    public: {
      http: ['https://1rpc.io/opbnb'],
    },
  },
  blockExplorers: {
    default: {
      name: 'opBNBScan',
      url: 'https://opbnbscan.com',
    },
  },
};

export const evmChains = [
  opBNBMainnet,
  mainnet,
  arbitrum,
  avalanche,
  base,
  bsc,
  optimism,
  polygon,
  canto,
  celo,
  fantom,
];



