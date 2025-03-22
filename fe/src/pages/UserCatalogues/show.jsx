import { Link } from "react-router-dom";
import { Space, Table } from "antd";
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
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/users-catalogues/update/${record.key}`}>
          <EditOutlined
            type="edit"
            style={{ color: "green", fontSize: "20px" }}
          />
        </Link>
        <Link to={`/users-catalogues/delete/${record.key}`}>
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
  const [usersCatalogues, setUsersCatalogues] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setGlobalLoading } = useContext(LoadingContext);
  const getUsersCatalogues = useCallback(async () => {
    setGlobalLoading(true);
    setLoading(true);
    const response = await axios.get("/users-catalogues");
    const formattedData = response.userCatalogues.map((userCatalogue) => ({
      key: userCatalogue.id,
      name: userCatalogue.name,
      description: userCatalogue.description,
    }));
    setUsersCatalogues(formattedData);
    setGlobalLoading(false);
    setLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {
    getUsersCatalogues();
  }, [getUsersCatalogues]);

  return (
    <div className="w-full">
      <div className="flex justify-between align-center">
        <div className="flex align-center gap-12">
          <h1>Danh sách vai trò</h1>
        </div>
        <Link to={"/users-catalogues/create"}>
          <Button type="primary" style={{ marginBottom: "20px" }}>
            Thêm mới vai trò
          </Button>
        </Link>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={usersCatalogues}
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
