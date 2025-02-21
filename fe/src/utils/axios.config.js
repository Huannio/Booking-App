import { notification } from "antd";
import axios from "axios";
import { handleLogoutApi, handleRefreshTokenApi } from "~/api";
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // Cho phép gửi cookie
});

// Thời gian chờ tối đa của 1 request
instance.defaults.timeout = 1000 * 60 * 10; // 10 phut

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger (200-299)
    // Do something with response error
    // Hiển thị thông báo các loại lỗi khác trừ mã 403 => dùng cho refresh token
    if (error.response?.status !== 403) {
      notification.error({
        message: error?.response?.data?.message || error?.message,
      });
    }

    // Logout khi bị lỗi 401
    if (error.response?.status === 401) {
      handleLogoutApi().then(() => {
        location.href = "/login";
      });
    }

    // Gọi api refresh token khi bị lỗi 403
    const originalRequest = error.config; // Lấy các request api đang bị lỗi
    if (error.response?.status === 403 && !originalRequest._retry) {
      // Gán giá trị _retry = true cho request refresh token => Trong khoảng thời gian chờ, chỉ gọi 1 lần refresh token
      originalRequest._retry = true;
      handleRefreshTokenApi()
        .then(() => {
          return instance(originalRequest);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
      return instance(originalRequest);
    }

    Promise.reject(error);
  }
);

export default instance;
