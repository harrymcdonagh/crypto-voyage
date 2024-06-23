import axios from "axios";

export default axios.create({
  baseURL: "https://pro-api.coinmarketcap.com",
  params: {
    key: "297e70db-d67c-4f14-810c-b7e7ffcfc899",
  },
});