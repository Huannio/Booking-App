import { Link } from "react-router-dom";
import { Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "~/utils/axios.config";
import { useEffect, useState, useContext, useCallback } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import { handleSearchPermissionsApi } from "~/api";
import { SearchInputBox } from "~/components/SearchBox";

const columns = [
  {
    title: "Quyền",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Đường dẫn",
    dataIndex: "canonical",
    key: "canonical",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/permissions-management/update/${record.key}`}>
          <EditOutlined
            type="edit"
            style={{ color: "green", fontSize: "20px" }}
          />
        </Link>
        <Link to={`/permissions-management/delete/${record.key}`}>
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
  const [loading, setLoading] = useState(true);
  const { setGlobalLoading } = useContext(LoadingContext);
  const [permissions, setPermissions] = useState([]);
  const formatData = (data) => {
    return data.map((permission) => ({
      key: permission.id,
      name: permission.name,
      canonical: permission.canonical,
    }));
  };
  const getPermissions = useCallback(async () => {
    setGlobalLoading(true);
    setLoading(true);

    const response = await axios.get("/permissions-management");
    setPermissions(formatData(response.data));

    setGlobalLoading(false);
    setLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {
    getPermissions();
  }, [getPermissions]);

  return (
    <div className="w-full">
      <div className="flex justify-between align-center">
        <div className="flex align-center gap-12">
          <h1>Danh sách quyền</h1>
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
              placeholder="Tìm kiếm theo tên quyền..."
              api={handleSearchPermissionsApi}
              fieldDropdown={"name"}
              fieldDropdownLink={"id"}
              to="/permissions-management/update/"
              onSearchResult={(data) => setPermissions(formatData(data))}
            />
          </div>
        </div>
        <Link to={"/permissions-management/create"}>
          <Button type="primary" style={{ marginBottom: "20px" }}>
            Thêm mới quyền
          </Button>
        </Link>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={permissions}
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
