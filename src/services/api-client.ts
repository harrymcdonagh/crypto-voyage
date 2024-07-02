import axios from "axios";

const API_KEY = "297e70db-d67c-4f14-810c-b7e7ffcfc899";

const axiosInstance = axios.create({
  baseURL: "https://pro-api.coinmarketcap.com",
});

axiosInstance.interceptors.request.use(config => {
  config.url = `${config.url}?CMC_PRO_API_KEY=${API_KEY}`;
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
