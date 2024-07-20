import axios from "axios";

const coinMarketCapAPIKey = "297e70db-d67c-4f14-810c-b7e7ffcfc899";
const coinAPIKey = "c14d194b-be18-4ed0-b854-4800d0b0d32f";

// CoinMarketCap API configuration
const coinMarketCapAxiosInstance = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com",
});

coinMarketCapAxiosInstance.interceptors.request.use(
  (config) => {
    config.headers["X-CMC_PRO_API_KEY"] = coinMarketCapAPIKey;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// CoinAPI.io API configuration
const coinAPIAxiosInstance = axios.create({
  baseURL: "https://rest.coinapi.io",
});

coinAPIAxiosInstance.interceptors.request.use(
  (config) => {
    // Append API key to the URL
    config.url += `/apikey-${coinAPIKey}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export the instances
export { coinMarketCapAxiosInstance, coinAPIAxiosInstance };
