import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
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
      let isMounted = true;

      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.get<T[]>(endpoint, {
            signal: controller.signal,
            ...requestConfig,
          });
          if (isMounted) {
            setData(response.data);
          }
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error("Error fetching data:", error);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };

      fetchData();

      return () => {
        isMounted = false;
        controller.abort();
      };
    },
    deps ? [...deps] : []
  );

  return { data, isLoading };
};

export default useCoinAPIData;
