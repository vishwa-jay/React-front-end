import axios from "axios";
import { getTokenFromLocalStorage, removeToken } from "../helpers/tokenHelper";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const API = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (req) => {
    const token = getTokenFromLocalStorage();
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      removeToken();
      window.location.href = "/";
    } else if (err.response.status === 500) {
      console.log(err);
    }else {
      console.error(err);
    }
    return Promise.reject(err);
  }
);

const builder = {
  API,
};
export default builder;
