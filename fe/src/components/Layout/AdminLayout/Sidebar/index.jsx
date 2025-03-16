import config from "~/config";
import {
  AppstoreOutlined,
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
    label: <Link to={config.routes.users.index}>Quản lý người dùng</Link>,
  },
  {
    key: "/option3",
    icon: <ContainerOutlined />,
    label: <Link to = {config.routes.ships.index}>Quản lý du thuyền</Link>,
  },
  {
    key: "/features",
    icon: <ContainerOutlined />,
    label: <Link to={config.routes.features.index}>Quản lý đặc trưng</Link>,
  },
  {
    key: "/blogs",
    label: <Link to={config.routes.blogs.index}>Quản lý bài viết</Link>,
    icon: <ContainerOutlined />,
  },
  {
    key: "/navigation2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      { key: "/option9", label: "Option 9" },
      { key: "/option10", label: "Option 10" },
      {
        key: "/submenu",
        label: "Submenu",
        children: [
          { key: "/option11", label: "Option 11" },
          { key: "/option12", label: "Option 12" },
        ],
      },
    ],
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
      <Link to={config.routes.home} style={{ padding: "12px", display: "block" }}>
        <ImageWrapper src={images.logo} alt="mixivivu" widthSvgWrapperImage={156} heightSvgWrapperImage={42} />
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
