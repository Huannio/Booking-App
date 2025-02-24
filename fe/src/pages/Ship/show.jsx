import { Link } from "react-router-dom";
import { Input, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "~/utils/axios.config";
import { useEffect, useState, useContext, useCallback } from "react";
import { LoadingContext } from "~/components/Loading/Loading";

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
            style={{ color: "green", fontSize: "20px", cursor: "pointer" }}
          />
        </Link>
        <Link to={`/ships/delete/${record.key}`}>
          <DeleteOutlined
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
    try {
      const response = await axios.get("/ships");
      const formattedData = response.ships.map((ship, index) => ({
        key: ship.id,
        STT: index + 1,
        title: ship.title,
        address: ship.address,
        admin: ship.admin,
      }));
      setShips(formattedData);
    } catch (error) {
      console.error(error);
    } finally {
      setGlobalLoading(false);
      setLoading(false);
    }
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
        dataSource={ships}
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