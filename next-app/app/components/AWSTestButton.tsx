'use client';
import { useState } from 'react';

export default function AWSTestButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Replace with your actual API Gateway URL
  const API_URL = 'https://vif52qd4ua.execute-api.us-east-2.amazonaws.com/default/test-button-function';

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
          timestamp: new Date().toISOString()
        })
      });

      const data = await result.json();
      
      if (result.ok) {
        setResponse(`✅ Success! AWS Response: ${JSON.stringify(data, null, 2)}`);
      } else {
        throw new Error(data.message || 'Request failed');
      }
    } catch (err) {
      setError(`❌ Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          <pre className="text-green-800 text-sm whitespace-pre-wrap">{response}</pre>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
          <p className="text-red-600 text-xs mt-2">
            Make sure to update the API_URL in the component with your actual API Gateway endpoint.
          </p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>This button tests communication with:</p>
        <ul className="list-disc list-inside mt-2">
          <li>AWS API Gateway</li>
          <li>AWS Lambda Function</li>
        </ul>
      </div>
    </div>
  );
}
