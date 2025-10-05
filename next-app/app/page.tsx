'use client';
import { useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [debugInfo, setDebugInfo] = useState<string>('');

  // Replace with your actual API Gateway URL
  const API_URL = 'https://zhndd3sr1a.execute-api.us-east-2.amazonaws.com/default';

  const testAWSConnection = async () => {
    setIsLoading(true);
    setError('');
    setResponse('');
    setDebugInfo('');

    try {
      console.log('Making request to:', API_URL);
      
      const requestBody = {
        test: 'button_click',
        timestamp: new Date().toISOString(),
        message: 'Hello from Next.js frontend!'
      };

      setDebugInfo(`Sending request to: ${API_URL}\nMethod: POST\nBody: ${JSON.stringify(requestBody, null, 2)}`);

      const result = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const responseText = await result.text();
      setDebugInfo(prev => prev + `\n\nResponse Status: ${result.status}\nResponse Headers: ${JSON.stringify(Object.fromEntries(result.headers), null, 2)}\nResponse Body: ${responseText}`);

      console.log('Response status:', result.status);
      console.log('Response headers:', result.headers);
      console.log('Response body:', responseText);

      if (result.ok) {
        try {
          const data = JSON.parse(responseText);
          setResponse(`✅ Success! AWS Response: ${JSON.stringify(data, null, 2)}`);
        } catch (e) {
          setResponse(`✅ Success! Raw response: ${responseText}`);
        }
      } else {
        throw new Error(`HTTP ${result.status}: ${responseText}`);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(`❌ Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          AWS Lambda Debug Test
        </h1>
        
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">AWS Lambda Debug</h2>
          
          <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>API URL:</strong> {API_URL || 'NOT SET'}
            </p>
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

          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg">
              <p className="text-red-800 text-sm font-bold">{error}</p>
            </div>
          )}

          {debugInfo && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold mb-2">Debug Information:</h3>
              <pre className="text-gray-800 text-xs whitespace-pre-wrap">{debugInfo}</pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
