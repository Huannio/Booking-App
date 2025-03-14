import { Link } from "react-router-dom";
import {Space, Table } from "antd";
import {  EditOutlined } from "@ant-design/icons";
import axios from "~/utils/axios.config";
import { useEffect, useState, useContext, useCallback } from "react";
import { LoadingContext } from "~/components/Loading/Loading";

const columns = [
  {
    title: "Vai trò",
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
        <Link to={`/users-permissions/update/${record.key}`}>
          <EditOutlined
            type="edit"
            style={{ color: "green", fontSize: "20px" }}
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

    const response = await axios.get("/users-catalogues");
    const formattedData = response.userCatalogues.map((userCatalogue) => ({
      key: userCatalogue.id,
      name: userCatalogue.name,
      description: userCatalogue.description,
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
