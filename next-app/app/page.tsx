'use client';
import { useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [debugInfo, setDebugInfo] = useState<string>('');

  const API_URL = 'https://zhndd3sr1a.execute-api.us-east-2.amazonaws.com/default';

  const testAWSConnection = async () => {
    setIsLoading(true);
    setError('');
    setResponse('');
    setDebugInfo('Starting request...\n');

    try {
      setDebugInfo(prev => prev + `Sending POST to: ${API_URL}\n`);

      const requestBody = {
        test: 'button_click',
        timestamp: new Date().toISOString(),
        message: 'Hello from Next.js frontend!'
      };

      const startTime = Date.now();
      
      const result = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      setDebugInfo(prev => prev + 
        `Request completed in ${responseTime}ms\n` +
        `Status: ${result.status} ${result.statusText}\n` +
        `OK: ${result.ok}\n` +
        `Content-Type: ${result.headers.get('content-type')}\n`
      );

      const responseText = await result.text();
      
      setDebugInfo(prev => prev + 
        `Response body length: ${responseText.length} characters\n` +
        `Response body: ${responseText.substring(0, 500)}${responseText.length > 500 ? '...' : ''}\n`
      );

      console.log('Full response:', {
        status: result.status,
        statusText: result.statusText,
        headers: Object.fromEntries(result.headers),
        body: responseText
      });

      if (result.ok) {
        if (responseText) {
          try {
            const data = JSON.parse(responseText);
            setResponse(`✅ Success! Response: ${JSON.stringify(data, null, 2)}`);
          } catch (e) {
            setResponse(`✅ Success! Raw response: ${responseText}`);
          }
        } else {
          setResponse('✅ Request sent successfully (empty response)');
        }
      } else {
        throw new Error(`HTTP ${result.status}: ${responseText || 'No response body'}`);
      }

    } catch (err) {
      console.error('Full error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`❌ Error: ${errorMessage}`);
      setDebugInfo(prev => prev + `Error details: ${errorMessage}\n`);
    } finally {
      setIsLoading(false);
    }
  };

  // Test with different HTTP methods
  const testWithGet = async () => {
    setIsLoading(true);
    setError('');
    setResponse('');
    setDebugInfo('Testing GET request...\n');

    try {
      const result = await fetch(API_URL, { method: 'GET' });
      const responseText = await result.text();
      
      setDebugInfo(prev => prev + 
        `GET Status: ${result.status}\n` +
        `GET Response: ${responseText}\n`
      );
      
      if (result.ok) {
        setResponse(`✅ GET worked: ${responseText}`);
      } else {
        setResponse(`⚠ GET returned: ${result.status} - ${responseText}`);
      }
    } catch (err) {
      setError(`GET Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
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
        
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 font-mono text-sm break-all">
              <strong>API URL:</strong> {API_URL}
            </p>
          </div>
          
          <div className="flex gap-4 mb-4">
            <button
              onClick={testAWSConnection}
              disabled={isLoading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-3 px-4 rounded transition duration-200"
            >
              {isLoading ? 'Testing...' : 'Test POST'}
            </button>
            
            <button
              onClick={testWithGet}
              disabled={isLoading}
              className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-bold py-3 px-4 rounded transition duration-200"
            >
              {isLoading ? 'Testing...' : 'Test GET'}
            </button>
          </div>

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
              <h3 className="font-bold mb-2 text-gray-800">Debug Information:</h3>
              <pre className="text-gray-800 text-xs whitespace-pre-wrap font-mono">{debugInfo}</pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
