import React, { useState, useMemo } from 'react';

// --- Risk Card Component ---
// To resolve the import error, the RiskCard component is now defined directly in this file.
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
      { name: 'ریسک قرارداد هوشمند', score: 2.5, description: 'امتیاز پایین‌تر به معنای ریسک کمتر است.' },
      { name: 'ریسک نقدینگی', score: 1.8, description: 'نقدینگی بالا ریسک را کاهش می‌دهد.' },
      { name: 'ریسک نوسانات بازار', score: 4.5, description: 'وابستگی بالا به نوسانات کلی بازار.' },
      { name: 'ریسک متمرکزسازی', score: 3.1, description: 'میزان کنترل توسط تیم توسعه‌دهنده.' },
    ],
  },
  'compound-v2': {
    name: 'Compound V2',
    logo: 'https://placehold.co/40x40/22C55E/FFFFFF?text=CP',
    overallRisk: 4.1,
    metrics: [
      { name: 'ریسک قرارداد هوشمند', score: 3.0, description: 'کدبیس قدیمی‌تر با چندین بازبینی.' },
      { name: 'ریسک نقدینگی', score: 2.2, description: 'نقدینگی قوی در استخرهای اصلی.' },
      { name: 'ریسک نوسانات بازار', score: 5.0, description: 'بسیار حساس به افت قیمت ETH.' },
      { name: 'ریسک متمرکزسازی', score: 4.8, description: 'کلیدهای مدیریتی با کنترل قابل توجه.' },
    ],
  },
  'uniswap-v3': {
    name: 'Uniswap V3',
    logo: 'https://placehold.co/40x40/EC4899/FFFFFF?text=UN',
    overallRisk: 2.8,
    metrics: [
      { name: 'ریسک قرارداد هوشمند', score: 2.1, description: 'قراردادهای پیچیده اما به خوبی بازبینی شده.' },
      { name: 'ریسک نقدینگی', score: 4.0, description: 'ریسک نقدینگی متمرکز در برخی بازه‌ها.' },
      { name: 'ریسک نوسانات بازار', score: 3.5, description: 'ضرر ناپایدار یک ریسک کلیدی است.' },
      { name: 'ریسک متمرکزسازی', score: 1.5, description: 'کاملاً غیرمتمرکز با حاکمیت قوی.' },
    ],
  },
};

type ProtocolID = keyof typeof mockProtocolData;

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
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">یک پروتکل را برای تحلیل انتخاب کنید</h2>
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
            <span className="text-sm ml-2">امتیاز ریسک کلی</span>
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

export default Dashboard;

