import axios, { AxiosRequestConfig, AxiosInstance, AxiosError } from "axios";
import { useState, useEffect } from "react";

interface FetchResponse<T> {
  data: T[];
}

const useData = <T>(
  axiosInstance: AxiosInstance,
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(
    () => {
      const controller = new AbortController();

      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.get<FetchResponse<T>>(endpoint, {
            signal: controller.signal,
            ...requestConfig,
          });
          setData(response.data.data);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError;
            if (axiosError.response) {
              setError(`Request failed with status ${axiosError.response.status}`);
            } else if (axiosError.request) {
              setError("No response received");
            } else {
              setError("Error in request setup");
            }
          } else {
            setError("Unknown error");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchData();

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

export default useData;
