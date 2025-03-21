import { notification } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import axios from "~/utils/axios.config";
function AccountVerification() {
  let [searchParams] = useSearchParams();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  // Flag state to check if the account has been verified or not
  const [verified, setVerified] = useState(false);

  const verifyAccount = async () => {
    if (email && token) {
      const response = await axios.put(`/users/verify-account`, {
        email,
        token,
      });
      if (response.statusCode === 200) {
        notification.success({ message: response?.message });
        setVerified(true);
      }
    }
  };

  useEffect(() => {
    verifyAccount();
  }, []);

  // If url invalid, redirect to 404
  if (!email || !token) {
    return <Navigate to="/404" />;
  }

  if (!verified)
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        Đang xác minh tài khoản...
      </div>
    );

  return <Navigate to={`/login`} />;
}

export default AccountVerification;
