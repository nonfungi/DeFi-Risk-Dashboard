import React from 'react';

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

export default RiskCard;
