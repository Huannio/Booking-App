import axios from "~/utils/axios.config";

export const handleLogoutApi = async () => {
  localStorage.removeItem("user");
  return await axios.post("/auth/logout");
};

export const handleRefreshTokenApi = async () => {
  return await axios.post("/auth/refresh-token");
};

export const handleCheckAuthApi = async () => {
  return await axios.get("/auth/check-auth");
};
