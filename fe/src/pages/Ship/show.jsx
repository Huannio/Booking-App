import { Link } from "react-router-dom";
import { Input, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState, useContext, useCallback } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import { handleGetShipsApi } from "~/api";
import { useSelector } from "react-redux";
import { selectCurrentPermission } from "~/redux/user/userSlice";

const shipsColumn = (permissions) => {
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
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
  ];

  if (
    permissions.includes("ships.update") &&
    permissions.includes("ships.delete")
  ) {
    columns.push({
      title: "Tùy chọn",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/ships/update/${record.slug}`}>
            <EditOutlined
              style={{ color: "green", fontSize: "20px", cursor: "pointer" }}
            />
          </Link>
          <Link to={`/ships/delete/${record.slug}`}>
            <DeleteOutlined
              style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
            />
          </Link>
        </Space>
      ),
    });
  }
  return columns;
};

function Show() {
  const permissions = useSelector(selectCurrentPermission);

  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setGlobalLoading } = useContext(LoadingContext);

  const getShips = useCallback(async () => {
    setGlobalLoading(true);
    setLoading(true);
    const response = await handleGetShipsApi();
    const formattedData = response.ships.map((ship, index) => ({
      index: index + 1,
      slug: ship.slug,
      key: ship.id,
      title: ship.title,
      address: ship.address,
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
        {permissions.includes("ships.create") && (
          <Link to="/ships/create">
            <Button type="primary" style={{ marginBottom: "20px" }}>
              Thêm mới du thuyền
            </Button>
          </Link>
        )}
      </div>
      <Table
        bordered
        columns={shipsColumn(permissions)}
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
