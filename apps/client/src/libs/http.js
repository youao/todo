import axios from "axios";
import useUserStore from "../stores/user";

const { VITE_TOKEN_NAME } = import.meta.env;

const instance = axios.create({
  baseURL: "/api/",
  timeout: 20000,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(VITE_TOKEN_NAME);
  if (token) {
    config.headers[VITE_TOKEN_NAME] = token;
  }
  return config;
});

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (!data?.code) return response;
    if (data.code === 200) return data;
    if (data.code === 401) {
      const userStore = useUserStore();
      userStore.logout();
    }
    return Promise.reject(data);
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
