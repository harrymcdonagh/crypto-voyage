import useData from "./useData";
import { coinMarketCapAxiosInstance } from "../services/api-client";

interface QuoteCurrency {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  last_updated: string;
}

interface Quote {
  USD: QuoteCurrency;
  BTC?: QuoteCurrency;
  ETH?: QuoteCurrency;
}

export interface Coin {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  infinite_supply: boolean;
  last_updated: string;
  date_added: string;
  tags: string[];
  platform: null | string;
  self_reported_circulating_supply: null | number;
  self_reported_market_cap: null | number;
  quote: Quote;
}

export interface DataResponse {
  data: Coin[];
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
  };
}

const useCoins = () => {
  return useData<Coin>(coinMarketCapAxiosInstance, "v1/cryptocurrency/listings/latest");
};

export default useCoins;
