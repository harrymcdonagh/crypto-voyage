import { coinMarketCapAxiosInstance } from "../services/api-client";
import useData from "./useData";

export interface CoinInfo {
  id: number;
  logo: string;
}

const useCoins = () => {
  return useData<CoinInfo>(coinMarketCapAxiosInstance, "/v2/cryptocurrency/info");
};

export default useCoins;
