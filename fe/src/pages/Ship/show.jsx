import { Link } from "react-router-dom";
import { Button, Input, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useCallback, useContext, useEffect, useState } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import { handleGetShipsApi } from "~/api";

const columns = [
  {
    title: "STT",
    dataIndex: "STT",
    key: "STT",
  },
  {
    title: "Tên du thuyền",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Công ty điều hành",
    dataIndex: "admin",
    key: "admin",
  },
  {
    title: "Tùy chọn",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/ships/update/${record.key}`}>
          <EditOutlined
            type="edit"
            style={{ color: "green", fontSize: "20px", cursor: "pointer" }}
          />
        </Link>
        <Link to={`/ships/delete/${record.key}`}>
          <DeleteOutlined
            type="delete"
            style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
          />
        </Link>
      </Space>
    ),
  },
];

function Show() {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setGlobalLoading } = useContext(LoadingContext);

  const getShips = useCallback(async () => {
    setGlobalLoading(true);
    setLoading(true);
    const response = await handleGetShipsApi();

    const formattedData = response.map((Products, index) => ({
      STT: index + 1,
      key: Products.id,
      title: Products.title,
      admin: Products.cruise.admin,
      address: Products.address
    }));
    setShips(formattedData);
    setGlobalLoading(false);
    setLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {
    getShips();
  }, [getShips]);

  return (
    <div className="w-full">
      <div className="flex justify-between align-center">
        <div className="flex align-center gap-12">
          <h1>Danh sách du thuyền</h1>
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            style={{ width: "300px" }}
          />
        </div>
        <Link to="/ships/create">
          <Button type="primary" style={{ marginBottom: "20px" }}>
            Thêm mới du thuyền
          </Button>
        </Link>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={ships || []}
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