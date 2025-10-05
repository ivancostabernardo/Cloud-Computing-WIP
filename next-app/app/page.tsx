'use client';
import { useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string>('');

  // Try both URLs - one of them should work after route configuration
  const API_URLS = [
    'https://zhndd3sr1a.execute-api.us-east-2.amazonaws.com/default',
    'https://zhndd3sr1a.execute-api.us-east-2.amazonaws.com/NewStage/'
  ];

  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const API_URL = API_URLS[currentUrlIndex];

  const testAWSConnection = async () => {
    setIsLoading(true);
    setResponse('');

    try {
      const result = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test: 'button_click',
          timestamp: new Date().toISOString(),
          message: 'Hello from Next.js!'
        })
      });

      const data = await result.json();
      
      if (result.ok) {
        setResponse(`✅ Success! Response: ${JSON.stringify(data, null, 2)}`);
      } else {
        throw new Error(data.message || 'Request failed');
      }
    } catch (err) {
      setResponse(`❌ Error with URL ${API_URL}: ${err instanceof Error ? err.message : 'Unknown error'}`);
      
      // Try the next URL
      if (currentUrlIndex < API_URLS.length - 1) {
        setCurrentUrlIndex(prev => prev + 1);
        setResponse(prev => prev + '\n\nTrying alternative URL...');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchUrl = () => {
    setCurrentUrlIndex(prev => (prev + 1) % API_URLS.length);
    setResponse('');
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          AWS Lambda Test
        </h1>
        
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 font-mono text-sm break-all">
              <strong>Current API URL:</strong> {API_URL}
            </p>
            <button
              onClick={switchUrl}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Switch to alternative URL
            </button>
          </div>
          
          <button
            onClick={testAWSConnection}
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-3 px-4 rounded transition duration-200 mb-4"
          >
            {isLoading ? 'Calling AWS Lambda...' : 'Test AWS Lambda'}
          </button>

          {response && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <pre className="text-green-800 text-sm whitespace-pre-wrap">{response}</pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
