import config from "~/config";
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, notification } from "antd";
import ImageWrapper from "~/components/ImageWrapper";
import images from "~/assets/images";
import Button from "~/components/Button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserApi, selectCurrentUser } from "~/redux/user/userSlice";
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedKeys, setSelectedKeys] = useState([location.pathname]);
  const selector = useSelector(selectCurrentUser);
  const permissions = selector?.permissions || [];

  const items = [
    permissions.includes("dashboard.index") && {
      key: "/dashboard",
      icon: <PieChartOutlined />,
      label: <Link to={config.routes.dashboard}>Dashboard</Link>,
    },
    permissions.includes("users.index") && {
      key: "/users",
      icon: <DesktopOutlined />,
      label: "Người dùng",
      children: [
        permissions.includes("users.index") && {
          key: "/users/index",
          label: <Link to={config.routes.users.index}>Quản lý người dùng</Link>,
        },
        permissions.includes("users-catalogues.index") && {
          key: "/users-catalogues",
          label: (
            <Link to={config.routes.users.catalogues.index}>
              Quản lý vai trò
            </Link>
          ),
        },
      ],
    },
    permissions.includes("permissions-management.index") && {
      key: "/permissions",
      icon: <ContainerOutlined />,
      label: "Quản lý quyền hạn",
      children: [
        {
          key: "/permissions-management",
          label: (
            <Link to={config.routes.permissions.index}>Quản lý quyền</Link>
          ),
        },
        {
          key: "/users/permissions",
          label: (
            <Link to={config.routes.users.permissions.index}>Phân quyền</Link>
          ),
        },
      ],
    },
    permissions.includes("ships.index") && {
      key: "/ships",
      icon: <ContainerOutlined />,
      label: <Link to={config.routes.ships.index}>Quản lý du thuyền</Link>,
    },
    permissions.includes("blogs.index") && {
      key: "/blogs",
      label: <Link to={config.routes.blogs.index}>Quản lý bài viết</Link>,
      icon: <ContainerOutlined />,
    },
    permissions.includes("features.index") && {
      key: "/features",
      label: <Link to={config.routes.features.index}>Quản lý đặc trưng</Link>,
      icon: <ContainerOutlined />,
    },
  ];

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  const handleLogout = async () => {
    const res = await dispatch(logoutUserApi());
    if (!res.error) {
      notification.success({ message: "Đăng xuất thành công!" });
      navigate("/login");
    }
  };

  return (
    <div style={{ width: 300, height: "100vh" }}>
      <Link
        to={config.routes.home}
        style={{ padding: "12px", display: "block" }}
      >
        <ImageWrapper
          src={images.logo}
          alt="mixivivu"
          widthSvgWrapperImage={156}
          heightSvgWrapperImage={42}
        />
      </Link>

      <Menu
        selectedKeys={selectedKeys}
        mode="inline"
        theme="light"
        items={items}
      />

      <Button
        onClick={handleLogout}
        primary
        small
        widthFull
        className="text-center interceptor-loading"
      >
        <div className="label md w-full">Logout</div>
      </Button>
    </div>
  );
};

export default Sidebar;
