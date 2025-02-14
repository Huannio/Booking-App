import { Link } from "react-router-dom";
import { Input, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "~/utils/axios.config";
import { useEffect, useState, useContext, useCallback } from "react";
import { LoadingContext } from "~/components/Loading/Loading";

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
    title: "Roles",
    key: "role_id",
    dataIndex: "roles",
    render: (roles) => <Tag color="green">{roles}</Tag>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/users/update/${record.key}`}>
          <EditOutlined
            type="edit"
            style={{ color: "green", fontSize: "20px" }}
          />
        </Link>
        <Link to={`/users/delete/${record.key}`}>
          <DeleteOutlined
            type="delete"
            style={{ color: "red", fontSize: "20px" }}
          />
        </Link>
      </Space>
    ),
  },
];

function Show() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setGlobalLoading } = useContext(LoadingContext);
  const getUsers = useCallback(async () => {
    try {
      setGlobalLoading(true);
      setLoading(true);
      const response = await axios.get("/users");

      const formattedData = response.data.users.map((user) => ({
        key: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles.name,
        role_id: user.role_id,
      }));
      setUsers(formattedData);
    } catch (error) {
      console.log(error);
    } finally {
      setGlobalLoading(false);
      setLoading(false);
    }
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
        <Link to={"/users/create"}>
          <Button type="primary" style={{ marginBottom: "20px" }}>
            Thêm mới người dùng
          </Button>
        </Link>
      </div>
      <Table
        bordered
        columns={columns}
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
