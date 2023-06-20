import axios from "axios";

export const axiosForManagerAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
