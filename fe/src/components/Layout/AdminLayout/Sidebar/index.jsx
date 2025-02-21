import config from "~/config";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Menu, notification } from "antd";
import ImageWrapper from "~/components/ImageWrapper";
import images from "~/assets/images";
import Button from "~/components/Button";
import { handleLogoutApi } from "~/api";

const items = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: <Link to={config.routes.dashboard}>Dashboard</Link>,
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: <Link to={config.routes.users.index}>Quản lý người dùng</Link>,
  },
  {
    key: "3",
    icon: <ContainerOutlined />,
    label: <Link to = {config.routes.ships.index}>Quản lý du thuyền</Link>,
  },
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      {
        key: "5",
        label: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
      },
      {
        key: "7",
        label: "Option 7",
      },
      {
        key: "8",
        label: "Option 8",
      },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "9",
        label: "Option 9",
      },
      {
        key: "10",
        label: "Option 10",
      },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          {
            key: "11",
            label: "Option 11",
          },
          {
            key: "12",
            label: "Option 12",
          },
        ],
      },
    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await handleLogoutApi();
    notification.success({ message: "Đăng xuất thành công!" });
    navigate("/login");
  };
  return (
    <div
      style={{
        width: 300,
        height: "100vh",
      }}
    >
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
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
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
