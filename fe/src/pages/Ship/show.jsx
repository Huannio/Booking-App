import { Link } from "react-router-dom";
import { Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState, useContext, useCallback } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import { handleGetShipsApi } from "~/api";
import { useSelector } from "react-redux";
import { selectCurrentPermission } from "~/redux/user/userSlice";
import { SearchInputBox } from "~/components/SearchBox";
import { handleSearchShipsApi } from "../../api";

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

  const formatData = (data) => {
    return data.map((ship, index) => ({
      index: index + 1,
      slug: ship.slug,
      key: ship.id,
      title: ship.title,
      address: ship.address,
    }));
  };
  const getShips = useCallback(async () => {
    setGlobalLoading(true);
    setLoading(true);
    const response = await handleGetShipsApi();
    const data = formatData(response.ships);
    setShips(data);
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
              placeholder="Tìm kiếm"
              api={handleSearchShipsApi}
              fieldDropdown={"title"}
              fieldDropdownLink={"slug"}
              to="/ships/update/"
              onSearchResult={(data) => setShips(formatData(data))}
            />
          </div>
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
