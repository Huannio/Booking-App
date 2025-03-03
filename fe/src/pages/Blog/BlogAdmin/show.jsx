import { Link } from "react-router-dom";
import { Button, Input, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useCallback, useContext, useEffect, useState } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import { handleGetBlogsApi } from "~/api";

const columns = [
  {
    title: "Tiêu đề",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Loại blog",
    key: "type",
    dataIndex: "type",
    render: (type) => <Tag color="green">{type}</Tag>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/blogs/update/${record.key}`}>
          <EditOutlined
            type="edit"
            style={{ color: "green", fontSize: "20px" }}
          />
        </Link>
        <Link to={`/blogs/delete/${record.key}`}>
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
const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setGlobalLoading } = useContext(LoadingContext);
  const getBlogs = useCallback(async () => {
    setGlobalLoading(true);
    setLoading(true);
    const response = await handleGetBlogsApi();

    const formattedData = response.map((blog) => ({
      key: blog.id,
      title: blog.title,
      type: blog.type.type
    }));
    setBlogs(formattedData);
    setGlobalLoading(false);
    setLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return (
    <div className="w-full">
      <div className="flex justify-between align-center">
        <div className="flex align-center gap-12">
          <h1>Danh sách bài viết</h1>
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            style={{ width: "300px" }}
          />
        </div>
        <Link to={"/blogs/create"}>
          <Button type="primary" style={{ marginBottom: "20px" }}>
            Thêm mới bài viết
          </Button>
        </Link>
      </div>
      <Table
        bordered
        loading={loading}
        dataSource={blogs}
        columns={columns}
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
