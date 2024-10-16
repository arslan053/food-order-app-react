import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config){
  const response = await fetch(url, config);
  const resData = await response.json();
  
  if(!response.ok){
    throw new Error(resData.message || 'Something went wrong, failed to send request');
  }
  return resData;
}

export default function useHttp(url, config, intialData){
  const [data, setData]=useState(intialData);
  const [isLoading, setisLoading]=useState(false);
  const [error, setError]=useState();

  const sendRequest = useCallback(async function sendRequest(){
      setisLoading(true);
      try {
        const resData = await sendHttpRequest(url, config);
        setData(resData)
      } catch (error) {
        setError(error.message || 'Something went wrong')
      }
      setisLoading(false);
    }, [url]);

  useEffect(() => {
    sendRequest()
  }, [sendRequest])

  return {
    data,
    isLoading,
    error,
    sendRequest
  }
}
