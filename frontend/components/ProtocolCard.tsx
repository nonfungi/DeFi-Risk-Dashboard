// Define the structure of the props that this component will receive
type Protocol = {
  id: number;
  name: string;
  category: string;
  tvl: number;
  logo?: string;
};

// Define the component's props using the type above
interface ProtocolCardProps {
  protocol: Protocol;
}

// Helper function to format large numbers
const formatTvl = (tvl: number) => {
  if (tvl > 1_000_000_000) {
    return `$${(tvl / 1_000_000_000).toFixed(2)}b`;
  }
  if (tvl > 1_000_000) {
    return `$${(tvl / 1_000_000).toFixed(2)}m`;
  }
  if (tvl > 1_000) {
    return `$${(tvl / 1_000).toFixed(2)}k`;
  }
  return `$${tvl.toFixed(2)}`;
};

// Make sure "export default" is here
export default function ProtocolCard({ protocol }: ProtocolCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-4">
        {protocol.logo && (
          <img src={protocol.logo} alt={`${protocol.name} logo`} className="w-10 h-10 rounded-full mr-4" />
        )}
        <h2 className="text-xl font-bold">{protocol.name}</h2>
      </div>
      <div>
        <p className="text-gray-600">
          <span className="font-semibold">Category:</span> {protocol.category}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">TVL:</span> {formatTvl(protocol.tvl)}
        </p>
      </div>
    </div>
  );
}