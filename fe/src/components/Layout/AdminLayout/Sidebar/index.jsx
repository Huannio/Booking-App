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
import { handleLogoutApi } from "~/api";
import { useState, useEffect } from "react";

const items = [
  {
    key: "/dashboard",
    icon: <PieChartOutlined />,
    label: <Link to={config.routes.dashboard}>Dashboard</Link>,
  },
  {
    key: "/users",
    icon: <DesktopOutlined />,
    label: "Người dùng",
    children: [
      {
        key: "/users/index",
        label: <Link to={config.routes.users.index}>Quản lý người dùng</Link>,
      },
      {
        key: "/users-catalogues",
        label: (
          <Link to={config.routes.users.catalogues.index}>Quản lý vai trò</Link>
        ),
      },
    ],
  },
  {
    key: "/permissions",
    icon: <ContainerOutlined />,
    label: "Quản lý quyền hạn",
    children: [
      {
        key: "/permissions/index",
        label: <Link to={config.routes.permissions.index}>Quản lý quyền</Link>,
      },
      {
        key: "/users/permissions",
        label: (
          <Link to={config.routes.users.permissions.index}>Phân quyền</Link>
        ),
      },
    ],
  },
  {
    key: "/ships",
    icon: <ContainerOutlined />,
    label: <Link to={config.routes.ships.index}>Quản lý du thuyền</Link>,
  },
  {
    key: "/blogs",
    label: <Link to={config.routes.blogs.index}>Quản lý bài viết</Link>,
    icon: <ContainerOutlined />,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([location.pathname]);

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  const handleLogout = async () => {
    await handleLogoutApi();
    notification.success({ message: "Đăng xuất thành công!" });
    navigate("/login");
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
