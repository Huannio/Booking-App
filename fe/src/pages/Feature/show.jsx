import { Link } from "react-router-dom";
import { Input, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState, useContext, useCallback } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import { handleGetFeaturesApi } from "~/api";

const columns = [
  {
    title: "STT",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Tên đặc trưng",
    dataIndex: "text",
    key: "text",
  },
  {
    title: "loại đặc trưng",
    dataIndex: "feature_types",
    key: "feature_types",
    render: (feature_types) => <Tag color="green">{feature_types}</Tag>,
  },
  {
    title: "Tùy chọn",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/features/update/${record.key}`}>
          <EditOutlined
            style={{ color: "green", fontSize: "20px", cursor: "pointer" }}
          />
        </Link>
        <Link to={`/features/delete/${record.key}`}>
          <DeleteOutlined
            style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
          />
        </Link>
      </Space>
    ),
  },
];

function Show() {
  const [Features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setGlobalLoading } = useContext(LoadingContext);

  const getFeatures = useCallback(async () => {
    setGlobalLoading(true);
    setLoading(true);
    const response = await handleGetFeaturesApi();
    const formattedData = response.features.map((feature, index) => ({
      index: index + 1,
      key: feature.id,
      text: feature.text,
      feature_types: feature.types?.name,
      type: feature.type,
    }));
    setFeatures(formattedData);
    setGlobalLoading(false);
    setLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {
    getFeatures();
  }, [getFeatures]);

  return (
    <div className="w-full">
      <div className="flex justify-between align-center">
        <div className="flex align-center gap-12">
          <h1>Danh sách đặc trưng</h1>
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            style={{ width: "300px" }}
          />
        </div>
        <Link to="/features/create">
          <Button type="primary" style={{ marginBottom: "20px" }}>
            Thêm mới đặc trưng
          </Button>
        </Link>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={Features}
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
