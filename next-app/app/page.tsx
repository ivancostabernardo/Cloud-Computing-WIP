'use client';
import { useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string>('');

  const testAWSConnection = async () => {
    setIsLoading(true);
    setResponse('');
    
    // Simulate AWS API call
    setTimeout(() => {
      setResponse('✅ AWS connection test successful! (This is a simulation)');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          AWS Services Test
        </h1>
        
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">AWS Connection Test</h2>
          
          <button
            onClick={testAWSConnection}
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-3 px-4 rounded transition duration-200"
          >
            {isLoading ? 'Testing AWS Connection...' : 'Test AWS Connection'}
          </button>

          {response && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800">{response}</p>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600">
            <p>Click the button to test AWS service communication.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
