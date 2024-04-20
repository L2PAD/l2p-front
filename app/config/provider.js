import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
  } from "@web3modal/ethereum";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

//const chains = [chain.mainnet];
export const blastNet = {
  id: 81457,
  name: 'Blast Sepolia',
  network: 'Blast Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://rpc.blast.io'] },
    default: { http: ['https://rpc.blast.io'] },
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://blastscan.io' },
    default: { name: 'SnowTrace', url: 'https://blastscan.io' },
  }
}
export const zkTestnet = {
  id: 81457,
  name: 'Blast Sepolia',
  network: 'Blast Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://rpc.blast.io'] },
    default: { http: ['https://rpc.blast.io'] },
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://blastscan.io' },
    default: { name: 'SnowTrace', url: 'https://blastscan.io' },
  }
}

export const bscTestnet = {
  id: 97,
  name: 'BNB Smart Chain Testnet',
  network: 'BNB Smart Chain Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'tBNB',
  },
  rpcUrls: {
    public: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545/'] },
    default: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545/'] },
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://testnet.bscscan.com/' },
    default: { name: 'SnowTrace', url: 'https://testnet.bscscan.com/' },
  }
}

export const MarketNet = {
  id: 324,
  name: 'zkSync Era Mainnet',
  network: 'zkSync Era Mainnet',
  nativeCurrency: {
    decimals: 6,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://mainnet.era.zksync.io'] },
    default: { http: ['https://mainnet.era.zksync.io'] },
  },
  blockExplorers: {
    etherscan: { name: 'zkSync Era Block Explorer', url: 'https://explorer.zksync.io/' },
    default: { name: 'zkSync Era Block Explorer', url: 'https://explorer.zksync.io/' },
  }
}

const { chains, publicClient } = configureChains(
  [zkTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://testnet.era.zksync.dev`,
      }),
    }),
  ],
)

const auth = () => {
    try{
        const { provider } = configureChains(chains, [
            walletConnectProvider({ projectId: "c3aa2dd660a1a5a1922e0dbdfc712912"}),
          ]);
          
           const wagmiClient = createClient({
            autoConnect: false,
            connectors: modalConnectors({ appName: "Noname", chains }),
            provider,
          });
        const ethereumClient = new EthereumClient(wagmiClient, chains);
        
        return {wagmiClient , ethereumClient}
    }catch(error){
        console.log(error)
    }
}

export const {wagmiClient , ethereumClient} = auth()


// export const decimals = 6
export const decimals = 18
export const marketDecimals = 6

export const adminAddress = '0xD128f1E3b2938eB005Bc5c750A66b82173f62857'
// export const adminAddress = '0xD28e844A6dC6a89BaC7b46c54bC7C7F40033Aa79'

export const chainIdValue = 81457
export const marketChainIdValue = 324
// export const chainIdValue = 97
    