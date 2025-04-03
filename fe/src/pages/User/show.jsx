import { Link } from "react-router-dom";
import { Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "~/utils/axios.config";
import { useEffect, useState, useContext, useCallback } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import { useSelector } from "react-redux";
import { selectCurrentPermission } from "~/redux/user/userSlice";
import { SearchInputBox } from "~/components/SearchBox";
import { handleSearchUsersApi } from "~/api";

const getUserTableColumns = (permissions) => {
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      key: "user_catalogues",
      dataIndex: "user_catalogues",
      render: (user_catalogues) => <Tag color="green">{user_catalogues}</Tag>,
    },
    {
      title: "Trạng thái",
      key: "publish",
      dataIndex: "publish",
      render: (publish) => (
        <Tag color={publish ? "green" : "red"}>
          {publish ? "Đã kích hoạt" : "Chưa kích hoạt"}
        </Tag>
      ),
    },
  ];

  if (
    permissions.includes("users.update") &&
    permissions.includes("users.delete")
  ) {
    columns.push({
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {permissions.includes("users.update") && (
            <Link to={`/users/update/${record.key}`}>
              <EditOutlined style={{ color: "green", fontSize: "20px" }} />
            </Link>
          )}
          {permissions.includes("users.delete") && (
            <Link to={`/users/delete/${record.key}`}>
              <DeleteOutlined style={{ color: "red", fontSize: "20px" }} />
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

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setGlobalLoading } = useContext(LoadingContext);
  const formatData = (data) => {
    return data.map((user) => ({
      key: user.id,
      name: user.name,
      email: user.email,
      user_catalogues: user.user_catalogues.name,
      user_catalogues_id: user.user_catalogues.id,
      publish: user.publish,
    }));
  };
  const getUsers = useCallback(async () => {
    setGlobalLoading(true);
    setLoading(true);
    const response = await axios.get("/users");
    setUsers(formatData(response.users));
    setGlobalLoading(false);
    setLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="w-full">
      <div className="flex justify-between align-center">
        <div className="flex align-center gap-12">
          <h1>Danh sách người dùng</h1>
          <div style={{ width: "300px" }}>
            <SearchInputBox
              hideDropdown
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
              placeholder="Tìm kiếm theo email..."
              api={handleSearchUsersApi}
              fieldDropdown={"email"}
              fieldDropdownLink={"id"}
              to="/users/update/"
              onSearchResult={(data) => setUsers(formatData(data))}
            />
          </div>
        </div>
        {permissions.includes("users.create") && (
          <Link to={"/users/create"}>
            <Button type="primary" style={{ marginBottom: "20px" }}>
              Thêm mới người dùng
            </Button>
          </Link>
        )}
      </div>
      <Table
        bordered
        columns={getUserTableColumns(permissions)}
        dataSource={users}
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
