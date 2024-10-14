import { useState, useEffect } from "react";
import axios from "axios";

const useDataFetch = (url, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading

        // Create request configuration with Authorization header
        const config = {
          method: "post",
          maxBodyLength: Infinity,
          url: url,
          headers: {
            Authorization: `Bearer ${token}`, // Ensure Bearer token format if needed
          },
        };

        // Await the Axios request
        const response = await axios.request(config);

        // Set the fetched data
        setData(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching the data."
        );
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [url, token]);

  return { data, loading, error };
};

export default useDataFetch;
