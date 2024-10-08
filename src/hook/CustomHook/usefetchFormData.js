import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearUserLocalData } from "../../utils/common";

const useFetchFormData = (url, config) => {
  const [response, setResponse] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  const loadQuery = async (data, rest) => {
    const token = localStorage.getItem("UniFormDesign_token");
    const headers = !token
      ? {}
      : {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        };

    return new Promise((resolve, reject) => {
      setLoading(true);
      instance({
        url: `${url}`,
        ...config,
        data,
        headers,
      })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setLoading(false);
            setError(undefined);
            response.data != null && setResponse(response.data);
          } else {
            setLoading(false);
            setError(response?.data);
            setErrorMessage(response?.data?.message ?? "Something went wrong!");
            setResponse(undefined);
          }
        })
        .catch((e) => {
          if (e.response?.status === 401 || e.response?.status === 403) {
            clearUserLocalData();
            navigate("/");
          } else if (e.response?.status === 404) {
            setResponse(undefined);
          } else {
            setResponse(undefined);
          }
          setErrorMessage(
            e.response?.data?.toString() ?? "Something went wrong!"
          );
          setError(e.response?.data);
          setLoading(false);
        });
    });
  };

  return [loadQuery, { response, loading, error, errorMessage }];
};

export default useFetchFormData;
