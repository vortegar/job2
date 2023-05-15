import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = `Bearer ${token}`;
      config.baseURL = apiUrl;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch
  };
