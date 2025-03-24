import { Link } from "react-router-dom";
import { Button, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useCallback, useContext, useEffect, useState } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import { handleGetBlogsApi } from "~/api";
import { useSelector } from "react-redux";
import { selectCurrentPermission } from "~/redux/user/userSlice";
import { handleSearchBlogsApi } from "~/api";
import { SearchInputBox } from "~/components/SearchBox";
const blogColumns = (permissions) => {
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
  ];

  if (
    permissions.includes("blogs.update") &&
    permissions.includes("blogs.delete")
  ) {
    columns.push({
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
    });
  }
  return columns;
};

function Show() {
  const permissions = useSelector(selectCurrentPermission);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setGlobalLoading } = useContext(LoadingContext);

  const formatData = (data) => {
    return data.map((blog) => ({
      key: blog.id,
      title: blog.title,
      type: blog.type.type,
    }));
  };

  const getBlogs = useCallback(async () => {
    setGlobalLoading(true);
    setLoading(true);
    const response = await handleGetBlogsApi();
    setBlogs(formatData(response.data));
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
          <div style={{ width: "300px" }}>
            <SearchInputBox
              inputGroup
              name="search"
              firstIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              }
              placeholder="Tìm kiếm theo tên quyền..."
              api={handleSearchBlogsApi}
              fieldDropdown={"title"}
              fieldDropdownLink={"id"}
              to="/blogs/update/"
              onSearchResult={(data) => setBlogs(formatData(data))}
              hideDropdown
            />
          </div>
        </div>
        {permissions.includes("blogs.create") && (
          <Link to={"/blogs/create"}>
            <Button type="primary" style={{ marginBottom: "20px" }}>
              Thêm mới bài viết
            </Button>
          </Link>
        )}
      </div>
      <Table
        bordered
        loading={loading}
        dataSource={blogs}
        columns={blogColumns(permissions)}
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
