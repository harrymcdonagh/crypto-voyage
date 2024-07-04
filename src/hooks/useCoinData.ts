import { coinAPIAxiosInstance } from "../services/api-client";
import useCoinAPIData from "./useCoinAPIData";

interface CoinData {
  time_period_start: string;
  time_period_end: string;
  time_open: string;
  time_close: string;
  rate_open: number;
  rate_high: number;
  rate_low: number;
  rate_close: number;
}

const useCoinData = (endpoint: string, params: any) => {
  console.log(useCoinAPIData<CoinData>(coinAPIAxiosInstance, endpoint, { params }));
  return useCoinAPIData<CoinData>(coinAPIAxiosInstance, endpoint, { params });
};

export default useCoinData;
