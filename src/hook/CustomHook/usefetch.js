import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearUserLocalData } from "../../utils/common";

const useFetch = (url, config, formdata) => {

  const [response, setResponse] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [credentialsMatch, setCredentialsMatch] = useState(undefined);
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
          "Content-Type": formdata ? "multipart/form-data" : "application/json",
        };

    return new Promise((resolve, reject) => {
      setLoading(true);
      instance({
        url,
        ...config,
        data,
        headers,
        ...rest,
      })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            resolve(response);
            setError(undefined);
            console.log(url, "response?.data?.data?.user.role_id");
            if (url == "/auth/login") {
              response.data != null &&
                response?.data?.data?.user.role_id == 2 &&
                setResponse(response.data);
              if (response?.data?.data?.user.role_id == 1) {
                setCredentialsMatch("Credentials do not match");
              } else {
                setCredentialsMatch(undefined);
              }
            } else {
              setResponse(response.data);
            }
          } else {
            setError(response?.data);
            setErrorMessage(response?.data?.message ?? "Something went wrong!");
            setResponse(undefined);
          }
          // setTimeout(() => {
          setLoading(false);
          // }, 1);
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
          setTimeout(() => {
            setLoading(false);
          }, 1);
        });
    });
  };

  return [
    loadQuery,
    { response, loading, error, errorMessage, credentialsMatch },
  ];
};

export default useFetch;
