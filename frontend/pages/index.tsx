import Head from 'next/head';
import { useState, useEffect } from 'react';
import ProtocolCard from '../components/ProtocolCard'; // Import our new component

// Define a type for our protocol data
type Protocol = {
  id: number;
  name: string;
  category: string;
  tvl: number;
  logo?: string;
  url?: string;
  chains?: string[];
};

export default function HomePage() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchProtocols = async () => {
      setIsLoading(true); // Start loading
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/protocols/`);
        const data: Protocol[] = await response.json();
        setProtocols(data);
      } catch (error) {
        console.error('Failed to fetch protocols:', error);
      } finally {
        setIsLoading(false); // Stop loading, regardless of success or error
      }
    };

    fetchProtocols();
  }, []);

  return (
    <>
      <Head>
        <title>DeFi Risk Dashboard</title>
      </Head>
      <main className="container mx-auto p-4 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold mb-6 text-center">DeFi Protocol Dashboard</h1>

        {isLoading ? (
          <p className="text-center">Loading protocols...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {protocols.map((protocol) => (
              <ProtocolCard key={protocol.id} protocol={protocol} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}