import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import axios from "~/utils/axios.config";
import PropTypes from "prop-types";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();

  const refreshToken = async () => {
    await axios.post("/auth/refresh-token");
    checkAuth();
  };

  // get user when page reload
  const checkAuth = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) return await axios.get("/auth/check-auth");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (data) => {
    const response = await axios.post("/auth/login", data);
    localStorage.setItem("user", JSON.stringify(response?.data?.user));
    notification.success({
      message: response?.data?.message || "Đăng nhập thành công!",
    });
    navigate("/dashboard");
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, AuthContext, useAuth };
