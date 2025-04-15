import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, hardhat } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected } from 'wagmi/connectors';
import Header from '@components/Header';
import Main from '@pages/home/Main';
import BuyToken from '@/pages/sale/BuyToken';
import Calculator from './pages/calculator';
import Whitepaper from './pages/whitepaper';
import MailRequest from './pages/mailRequest/MailRequest';
import Privacy from './pages/privacy';
import Terms from './pages/terms';
import Linktree from './pages/linktr';
import Tokenomics from './pages/tokenomics';

import './App.css';

// Define Ganache chain
const ganache = {
  id: 1337,
  name: 'Ganache',
  network: 'ganache',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:7545'] },
    public: { http: ['http://127.0.0.1:7545'] },
  },
};

// Create wagmi config
const config = createConfig({
  chains: [ganache, hardhat, mainnet],
  connectors: [
    injected({
      shimDisconnect: true,
      target: 'metaMask'
    })
  ],
  transports: {
    [ganache.id]: http('http://127.0.0.1:7545'),
    [hardhat.id]: http(),
    [mainnet.id]: http()
  }
});

// Create a client for react-query
const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Routes without header */}
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/whitepaper/*" element={<Whitepaper />} />
            <Route path="/mail-request" element={<MailRequest />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/sale" element={<BuyToken />} />
            <Route path="/linktr" element={<Linktree />} />
            <Route path="/tokenomics" element={<Tokenomics />} />

            {/* Routes with header */}
            <Route path="/" index element={<Main />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App; 