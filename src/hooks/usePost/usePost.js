import React, {useState} from 'react';
import axios from 'axios';

function usePost() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const post = async (url, apiData) => {
    try {
      setLoading(true);
      let responseData;
      axios.post(url, apiData).then(res => {
        console.log('response : ', res);
        responseData = res;
      });

      console.log(responseData);
      setData(responseData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  return {data, loading, error, post};
}
export default usePost;
