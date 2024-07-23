import axios from "axios";

const coinMarketCapAPIKey = "297e70db-d67c-4f14-810c-b7e7ffcfc899";
const coinAPIKey = "B1B01E56-174E-4475-A280-0B01BC9627F0";

// CoinMarketCap API configuration
const coinMarketCapAxiosInstance = axios.create({
  baseURL: "/api",
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
