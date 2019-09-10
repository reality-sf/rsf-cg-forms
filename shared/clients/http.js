import axios from "axios";
import qs from "qs";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3050';

const http = axios.create({
  baseURL: BACKEND_URL,
  paramsSerializer: (params) => qs.stringify(params)
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token === null) {
    return config;
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;
