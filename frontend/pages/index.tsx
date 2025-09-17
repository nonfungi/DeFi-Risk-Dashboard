import type { NextPage } from 'next';
import React, { useState, useMemo } from 'react';

// --- Icon Components ---
// All icons are now part of this file to resolve import issues.
const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z" />
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

// --- Header Component ---
interface HeaderProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          DeFi Risk Dashboard
        </h1>
        <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 shadow-lg shadow-blue-500/30">
              <WalletIcon />
              <span>Connect Wallet</span>
            </button>
        </div>
      </div>
    </header>
  );
};

// --- Risk Card Component ---
interface RiskCardProps {
  name: string;
  score: number;
  description: string;
}

const RiskCard: React.FC<RiskCardProps> = ({ name, score, description }) => {
  const getRiskColor = (s: number) => {
    if (s < 2.5) return 'text-green-500 dark:text-green-400';
    if (s < 4.0) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{name}</h3>
      <p className={`text-4xl font-bold ${getRiskColor(score)} mb-3`}>{score.toFixed(1)}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};

// --- Mock Data ---
const mockProtocolData = {
  'aave-v2': {
    name: 'Aave V2',
    logo: 'https://placehold.co/40x40/7C3AED/FFFFFF?text=AV',
    overallRisk: 3.2,
    metrics: [
      { name: 'Smart Contract Risk', score: 2.5, description: 'Lower score signifies lower risk.' },
      { name: 'Liquidity Risk', score: 1.8, description: 'High liquidity mitigates risk.' },
      { name: 'Market Volatility Risk', score: 4.5, description: 'High dependency on market-wide fluctuations.' },
      { name: 'Centralization Risk', score: 3.1, description: 'Degree of control held by the core team.' },
    ],
  },
  'compound-v2': {
    name: 'Compound V2',
    logo: 'https://placehold.co/40x40/22C55E/FFFFFF?text=CP',
    overallRisk: 4.1,
    metrics: [
      { name: 'Smart Contract Risk', score: 3.0, description: 'Older codebase with multiple audits.' },
      { name: 'Liquidity Risk', score: 2.2, description: 'Strong liquidity in major pools.' },
      { name: 'Market Volatility Risk', score: 5.0, description: 'Very sensitive to ETH price drops.' },
      { name: 'Centralization Risk', score: 4.8, description: 'Admin keys hold significant control.' },
    ],
  },
  'uniswap-v3': {
    name: 'Uniswap V3',
    logo: 'https://placehold.co/40x40/EC4899/FFFFFF?text=UN',
    overallRisk: 2.8,
    metrics: [
      { name: 'Smart Contract Risk', score: 2.1, description: 'Complex but well-audited contracts.' },
      { name: 'Liquidity Risk', score: 4.0, description: 'Risk of concentrated liquidity in certain ranges.' },
      { name: 'Market Volatility Risk', score: 3.5, description: 'Impermanent loss is a key risk factor.' },
      { name: 'Centralization Risk', score: 1.5, description: 'Highly decentralized with strong governance.' },
    ],
  },
};

type ProtocolID = keyof typeof mockProtocolData;

// --- Dashboard Component ---
const Dashboard: React.FC = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolID>('aave-v2');
  const protocol = useMemo(() => mockProtocolData[selectedProtocol], [selectedProtocol]);

  const getOverallRiskColor = (score: number) => {
    if (score < 3.0) return 'bg-green-500/20 text-green-400 dark:text-green-300 border-green-400';
    if (score < 4.0) return 'bg-yellow-500/20 text-yellow-400 dark:text-yellow-300 border-yellow-400';
    return 'bg-red-500/20 text-red-400 dark:text-red-300 border-red-400';
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Select a protocol to analyze</h2>
        <div className="flex flex-wrap gap-4">
          {Object.keys(mockProtocolData).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedProtocol(key as ProtocolID)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base
                ${selectedProtocol === key 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white border border-gray-200 dark:border-gray-700'
                }`}
            >
              {mockProtocolData[key as ProtocolID].name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div className='flex items-center gap-4'>
            <img src={protocol.logo} alt={`${protocol.name} logo`} className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{protocol.name}</h2>
          </div>
          <div className={`px-4 py-2 rounded-lg border text-center ${getOverallRiskColor(protocol.overallRisk)}`}>
            <span className="font-bold text-lg">{protocol.overallRisk.toFixed(1)}</span>
            <span className="text-sm ml-2">Overall Risk Score</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {protocol.metrics.map((metric) => (
            <RiskCard key={metric.name} {...metric} />
          ))}
        </div>
      </div>
    </>
  );
};


// --- Main Page Component ---
const Home: NextPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // This effect hook handles adding/removing the 'dark' class on the HTML element
  React.useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white min-h-screen font-sans transition-colors duration-300">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="container mx-auto p-4 md:p-8">
          <Dashboard />
        </main>

        <footer className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
            <p>This data is for demonstration purposes only and should not be considered financial advice.</p>
            <p>&copy; {new Date().getFullYear()} DeFi Risk Dashboard</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;

