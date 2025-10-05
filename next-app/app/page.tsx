'use client';
import { useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string>('');

  // TODO: Replace with your actual API Gateway URL
  const API_URL = 'https://zhndd3sr1a.execute-api.us-east-2.amazonaws.com/default/test-button-function-v2';

  const testAWSConnection = async () => {
    setIsLoading(true);
    setError('');
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
          message: 'Hello from Next.js frontend!'
        })
      });

      const data = await result.json();
      
      if (result.ok) {
        setResponse(`✅ Success! AWS Response: ${JSON.stringify(data, null, 2)}`);
      } else {
        throw new Error(data.message || 'Request failed');
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
          AWS Services Test
        </h1>
        
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">AWS Lambda Test</h2>
          
          <button
            onClick={testAWSConnection}
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-3 px-4 rounded transition duration-200"
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
              <p className="text-red-800 text-sm">{error}</p>
              <p className="text-red-600 text-xs mt-2">
                Make sure to update the API_URL with your actual API Gateway endpoint. 2
              </p>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600">
            <p>This will call your actual Lambda function via API Gateway.</p>
            <p className="mt-2 font-mono text-xs bg-gray-100 p-2 rounded">
              Current API_URL: {API_URL || 'Not set'}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
