import { Table, Checkbox, Button, Space, notification } from "antd";
import axios from "~/utils/axios.config";
import { useEffect, useState, useContext, useCallback } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleGetAllFeaturesApi, handleGetRoomByIdApi } from "~/api";
function UpdateFeature() {
  const navigate = useNavigate();

  const { slug, id } = useParams();
  const location = useLocation();
  const keywordParam = location.pathname.split("/")[1];

  const [data, setData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const { setGlobalLoading } = useContext(LoadingContext);

  const getData = useCallback(async () => {
    setGlobalLoading(true);
    const [featureRes, selectedRes] = await Promise.all([
      handleGetAllFeaturesApi(),
      handleGetRoomByIdApi(id),
    ]);

    const selectedFeaturesIds =
      selectedRes?.features.map((feature) => feature.id) || [];

    const formattedData = featureRes?.features?.map((item) => ({
      key: item.id,
      text: item.text,
      action: selectedFeaturesIds.includes(item.id),
    }));

    // Set trạng thái "chọn tất cả" nếu tất cả đều đã được chọn
    const isAllSelected =
      formattedData.length > 0 &&
      formattedData.every((item) => item.action === true);

    setSelectAll(isAllSelected);
    setData(formattedData);
    setGlobalLoading(false);
  }, [id, setGlobalLoading]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleCheckboxChange = (key, action, checked) => {
    const newData = data.map((row) =>
      row.key === key ? { ...row, [action]: checked } : row
    );
    const isAllSelected = newData.every((item) => item[action] === true);
    setSelectAll(isAllSelected);
    setData(newData);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    const updatedData = data.map((item) => ({
      ...item,
      action: newSelectAll,
    }));
    setSelectAll(newSelectAll);
    setData(updatedData);
  };

  const handleSubmit = async () => {
    const selectedFeatures = data
      .filter((item) => item.action)
      .map((item) => item.key);

    const response = await axios.post(`/rooms/updateFeature/${id}`, {
      selectedFeatures,
    });
    if (response.statusCode === 200) {
      notification.success({
        message: response?.message || "Cập nhật thông tin thành công!",
      });
      navigate(`/${keywordParam}/${slug}/rooms`);
    }
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "text",
      key: "text",
    },
    {
      title: (
        <Checkbox checked={selectAll} onChange={handleSelectAll}>
          Chọn tất cả
        </Checkbox>
      ),
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Checkbox
          checked={record.action}
          onChange={(e) =>
            handleCheckboxChange(record.key, "action", e.target.checked)
          }
        />
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleSubmit}>
          Cập nhật
        </Button>
      </Space>

      <Table
        rowKey="key"
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
      />
    </div>
  );
}

export default UpdateFeature;
