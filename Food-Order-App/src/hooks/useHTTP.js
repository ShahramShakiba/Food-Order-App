import { useCallback, useState } from 'react';

// this helper fn is dealing with "Sending-Request"
async function sendHTTPRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || 'Something Went Wrong, Failed To Send Request.'
    );
  }

  return resData;
}

export default function useHTTP(url, config) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // updating-state based on the Request-status | prevent infinite loop
  const sendRequest = useCallback(
    async function sendRequest() {
      setIsLoading(true);

      try {
        const resData = sendHTTPRequest(url, config);
        setData(resData);
      } catch (error) {
        setError(error.message || 'Something Went Wrong!');
      }

      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (config && config.method === 'GET') {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
  };
}
