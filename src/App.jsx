import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, hardhat } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected } from 'wagmi/connectors';
import Header from '@components/Header';
import Main from '@pages/home/Main';
import BuyToken from '@/pages/sale/BuyToken';
import CalculateTokenEarn from '@pages/calculateTokenEarn/calculateTokenEarn';
import Calculator from './pages/calculator';
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
        <Router basename="/HealthStepPage">
          <Routes>
            {/* Calculator tách riêng không có Header */}
            <Route path="/calculate" element={<CalculateTokenEarn />} />

            {/* Layout chính có Header */}
            <Route element={
              <div className="App">
                <Header />
                <main className="main-content">
                  <Outlet />
                </main>
              </div>
            }>
              <Route path="/" element={<Main />} />
              <Route path="/sale" element={<BuyToken />} />
            </Route>

            {/* Redirect các URL không hợp lệ về trang chủ */}
            <Route path="*" element={<Navigate to="/" replace />} />

            <Route path="/calculator" element={<Calculator />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App; 