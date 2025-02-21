import { Link } from "react-router-dom";
import { Input, Space, Table, Tag, Button, Modal, message } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "~/utils/axios.config";
import { useEffect, useState, useContext, useRef } from "react";
import { LoadingContext } from "~/components/Loading/Loading";

function ShowShip() {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setGlobalLoading } = useContext(LoadingContext);
  const abortControllerRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Lấy danh sách du thuyền
  const getShips = (keyword = "") => {
    setLoading(true);
    setGlobalLoading(true);

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    axios
      .get(`/ships?search=${keyword}`, { signal: controller.signal })
      .then((response) => {
        setShips(
          response.data.ships.map((ship) => ({
            key: ship.id,
            title: ship.title,
            address: ship.address,
            type_product: ship.ship_type?.name || "Không xác định",
            default_price: ship.default_price,
          }))
        );
      })
      .catch((error) => {
        if (error.name !== "CanceledError") {
          message.error("Lỗi khi lấy danh sách du thuyền");
        }
      })
      .finally(() => {
        setLoading(false);
        setGlobalLoading(false);
      });
  };

  useEffect(() => {
    getShips();
    return () => abortControllerRef.current?.abort();
  }, []);

  // Xóa du thuyền
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa du thuyền này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        axios
          .delete(`/ships/${id}`)
          .then(() => {
            message.success("Xóa thành công");
            setShips((prevShips) => prevShips.filter((ship) => ship.key !== id));
          })
          .catch(() => {
            message.error("Lỗi khi xóa");
          });
      },
    });
  };

  // Xử lý tìm kiếm với timeout (thay cho debounce)
  const handleSearch = (e) => {
    const value = e.target.value;

    clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      getShips(value);
    }, 500);
  };

  const columns = [
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
      title: "Loại",
      dataIndex: "type_product",
      key: "type_product",
      render: (type_product) => <Tag color="blue">{type_product}</Tag>,
    },
    {
      title: "Giá mặc định",
      dataIndex: "default_price",
      key: "default_price",
      render: (price) => `${price.toLocaleString()} VNĐ`,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/ships/update/${record.key}`}>
            <EditOutlined style={{ color: "green", fontSize: "20px" }} />
          </Link>
          <DeleteOutlined
            onClick={() => handleDelete(record.key)}
            style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h1>Danh sách du thuyền</h1>
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            style={{ width: "300px" }}
            onChange={handleSearch}
          />
        </div>
        <Link to="/ships/create">
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm mới
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

export default ShowShip;
