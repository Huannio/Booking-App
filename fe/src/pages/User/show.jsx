import { Link } from "react-router-dom";
import { Input, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "~/utils/axios.config";
import { useEffect, useState, useContext, useCallback } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import { useSelector } from "react-redux";
import { selectCurrentPermission } from "~/redux/user/userSlice";

const getUserTableColumns = (permissions) => {
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      key: "user_catalogues",
      dataIndex: "user_catalogues",
      render: (user_catalogues) => <Tag color="green">{user_catalogues}</Tag>,
    },
  ];

  if (
    permissions.includes("users.update") &&
    permissions.includes("users.delete")
  ) {
    columns.push({
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {permissions.includes("users.update") && (
            <Link to={`/users/update/${record.key}`}>
              <EditOutlined style={{ color: "green", fontSize: "20px" }} />
            </Link>
          )}
          {permissions.includes("users.delete") && (
            <Link to={`/users/delete/${record.key}`}>
              <DeleteOutlined style={{ color: "red", fontSize: "20px" }} />
            </Link>
          )}
        </Space>
      ),
    });
  }

  return columns;
};
function Show() {
  const permissions = useSelector(selectCurrentPermission);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setGlobalLoading } = useContext(LoadingContext);
  const getUsers = useCallback(async () => {
    setGlobalLoading(true);
    setLoading(true);
    const response = await axios.get("/users");

    const formattedData = response.users.map((user) => ({
      key: user.id,
      name: user.name,
      email: user.email,
      user_catalogues: user.user_catalogues.name,
      user_catalogues_id: user.user_catalogues.id,
    }));
    setUsers(formattedData);
    setGlobalLoading(false);
    setLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="w-full">
      <div className="flex justify-between align-center">
        <div className="flex align-center gap-12">
          <h1>Danh sách người dùng</h1>
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            style={{ width: "300px" }}
          />
        </div>
        {permissions.includes("users.create") && (
          <Link to={"/users/create"}>
            <Button type="primary" style={{ marginBottom: "20px" }}>
              Thêm mới người dùng
            </Button>
          </Link>
        )}
      </div>
      <Table
        bordered
        columns={getUserTableColumns(permissions)}
        dataSource={users}
        loading={loading}
        pagination={{
          pageSize: 5,
          hideOnSinglePage: true,
          showSizeChanger: false,
        }}
      />
    </div>
  );
}
export default Show;
