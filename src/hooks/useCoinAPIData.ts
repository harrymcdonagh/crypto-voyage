import axios, { AxiosRequestConfig, AxiosInstance, AxiosError } from "axios";
import { useState, useEffect } from "react";

const useCoinAPIData = <T>(
  axiosInstance: AxiosInstance,
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(
    () => {
      const controller = new AbortController();

      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.get<T[]>(endpoint, {
            signal: controller.signal,
            ...requestConfig,
          });
          console.log("API response data:", response.data);
          setData(response.data);
        } finally {
          setLoading(false);
        }
      };

      fetchData();

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, isLoading };
};

export default useCoinAPIData;
