import { coinMarketCapAxiosInstance } from "../services/api-client";
import useData from "./useData";

interface CoinMetadata {
  id: number;
  name: string;
  symbol: string;
  category: string;
  description: string;
  urls: {
    website: string[];
  };
}

interface CoinMetadataResponse {
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
  };
  data: {
    [key: number]: CoinMetadata;
  };
}

const useCoinMetadata = (endpoint: string, params: any) => {
  return useData<CoinMetadataResponse>(coinMarketCapAxiosInstance, endpoint, { params });
};

export default useCoinMetadata;
