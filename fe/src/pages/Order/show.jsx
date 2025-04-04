import { Link } from "react-router-dom";
import { Space, Table, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "~/utils/axios.config";
import { useEffect, useState, useContext, useCallback } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import { useSelector } from "react-redux";
import { selectCurrentPermission } from "~/redux/user/userSlice";

const getOrdersTableColumns = (permissions) => {
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (publish) => {
        switch (publish) {
          case "Đã thanh toán":
            return <Tag color="green">Đã thanh toán</Tag>;
          case "Đã đặt phòng":
            return <Tag color="yellow">Đã đặt phòng</Tag>;
          case "Đã huỷ":
            return <Tag color="red">Đã huỷ</Tag>;
          case "Hoàn thành":
            return <Tag color="orange">Hoàn thành</Tag>;
          default:
            return <Tag color="blue">Đang chờ</Tag>;
        }
      },
    },
  ];

  if (permissions.includes("orders.update")) {
    columns.push({
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {permissions.includes("orders.update") && (
            <Link to={`/orders/update/${record.key}`}>
              <EditOutlined style={{ color: "green", fontSize: "20px" }} />
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setGlobalLoading } = useContext(LoadingContext);

  const formatData = (data) => {
    return data.map((item) => ({
      key: item?.id,
      email: item?.bookingCustomers?.customer?.email,
      status: item?.status,
    }));
  };

  const getData = useCallback(async () => {
    setGlobalLoading(true);
    setLoading(true);
    const response = await axios.get("/orders/show");
    setData(formatData(response.data));
    setGlobalLoading(false);
    setLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="w-full">
      <div className="flex justify-between align-center">
        <div className="flex align-center gap-12">
          <h1>Danh sách đặt phòng</h1>
        </div>
      </div>
      <Table
        bordered
        columns={getOrdersTableColumns(permissions)}
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
