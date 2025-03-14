import { Link } from "react-router-dom";
import { Input, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "~/utils/axios.config";
import { useEffect, useState, useContext, useCallback } from "react";
import { LoadingContext } from "~/components/Loading/Loading";

const columns = [
  {
    title: "Quyền",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Đường dẫn",
    dataIndex: "canonical",
    key: "canonical",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/permissions-management/update/${record.key}`}>
          <EditOutlined
            type="edit"
            style={{ color: "green", fontSize: "20px" }}
          />
        </Link>
        <Link to={`/permissions-management/delete/${record.key}`}>
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
  const [loading, setLoading] = useState(true);
  const { setGlobalLoading } = useContext(LoadingContext);
  const [permissions, setPermissions] = useState([]);
  const getPermissions = useCallback(async () => {
    setGlobalLoading(true);
    setLoading(true);

    const response = await axios.get("/permissions-management");
    const formattedData = response.data.map((permission) => ({
      key: permission.id,
      name: permission.name,
      canonical: permission.canonical,
    }));

    setPermissions(formattedData);

    setGlobalLoading(false);
    setLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {
    getPermissions();
  }, [getPermissions]);

  return (
    <div className="w-full">
      <div className="flex justify-between align-center">
        <div className="flex align-center gap-12">
          <h1>Danh sách quyền</h1>
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            style={{ width: "300px" }}
          />
        </div>
        <Link to={"/permissions-management/create"}>
          <Button type="primary" style={{ marginBottom: "20px" }}>
            Thêm mới quyền
          </Button>
        </Link>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={permissions}
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
