import { Link, useParams, useLocation } from "react-router-dom";
import { Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState, useContext, useCallback } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import { useSelector } from "react-redux";
import { selectCurrentPermission } from "~/redux/user/userSlice";
import { handleGetAllRoomByProductSlugApi } from "~/api";
import { formatMoney } from "~/utils/formatters";

const roomsColumn = () => {
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Tên phòng",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Giá phòng",
      dataIndex: "default_price",
      key: "default_price",
    },
  ];

  columns.push({
    title: "Tùy chọn",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`update/${record.id}`}>
          <EditOutlined
            style={{ color: "green", fontSize: "20px", cursor: "pointer" }}
          />
        </Link>
        <Link to={`delete/${record.id}`}>
          <DeleteOutlined
            style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
          />
        </Link>
      </Space>
    ),
  });
  return columns;
};

function Show() {
  const permissions = useSelector(selectCurrentPermission);
  const location = useLocation();
  const keywordParam = location.pathname.split("/")[1];

  const { slug } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setGlobalLoading } = useContext(LoadingContext);

  const formatData = (data) => {
    return data.map((room, index) => ({
      index: index + 1,
      id: room.id,
      key: room.id,
      title: room.title,
      default_price: formatMoney(room.default_price) + " đ/khách",
    }));
  };
  const getRooms = useCallback(async () => {
    setGlobalLoading(true);
    setLoading(true);
    const response = await handleGetAllRoomByProductSlugApi(slug);
    const data = formatData(response.rooms);
    setData(data);
    setGlobalLoading(false);
    setLoading(false);
  }, [setGlobalLoading, slug]);

  useEffect(() => {
    getRooms();
  }, [getRooms]);

  return (
    <div className="w-full">
      <div className="flex justify-between align-center">
        <div className="flex align-center gap-12">
          <h1>Danh sách phòng</h1>
        </div>
        {permissions.includes(`${keywordParam}.room.create`) && (
          <Link to="create">
            <Button type="primary" style={{ marginBottom: "20px" }}>
              Thêm mới phòng
            </Button>
          </Link>
        )}
      </div>
      <Table
        bordered
        columns={roomsColumn()}
        dataSource={data}
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
