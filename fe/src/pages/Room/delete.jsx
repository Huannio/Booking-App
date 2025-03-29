import { useContext, useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { notification, Modal } from "antd";
import { InputField } from "~/components/Input";
import Button from "~/components/Button";
import axios from "~/utils/axios.config";

import { LoadingContext } from "~/components/Loading/Loading";
import { handleGetRoomByIdApi } from "~/api";

function Delete() {
  const navigate = useNavigate();
  const { slug, id } = useParams();

  const location = useLocation();
  const keywordParam = location.pathname.split("/")[1];

  const { setGlobalLoading } = useContext(LoadingContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const {
    control,
    reset,
    formState: { errors },
  } = useForm();

  const getRoom = useCallback(async () => {
    setGlobalLoading(true);
    const response = await handleGetRoomByIdApi(id);
    reset({ title: response?.title });
    setGlobalLoading(false);
  }, [setGlobalLoading, id, reset]);

  useEffect(() => {
    getRoom();
  }, [getRoom]);

  const handleDeleteShip = async () => {
    setConfirmLoading(true);
    const response = await axios.delete(`/rooms/delete/${id}`);
    if (response.statusCode === 200) {
      notification.success({ message: "Xóa phòng thành công!" });
      navigate(`/${keywordParam}/${slug}/rooms`);
    }
    setConfirmLoading(false);
    setModalVisible(false);
  };

  return (
    <div className="flex w-full flex-col gap-16">
      <h6>Xóa phòng</h6>

      <div className="flex flex-col gap-32">
        <div className="group-input" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className="warning-title">
            <p className="subheading lg" style={{ color: "red" }}>
              Lưu ý: Một khi xóa sẽ không thể khôi phục, hãy cân nhắc trước khi
              xóa!
            </p>
          </div>
          <div className="form-group">
            <InputField
              label="Tên phòng"
              type="text"
              name="title"
              placeholder="Nhập tên phòng..."
              control={control}
              error={errors.title}
              disabled
              inputGroup={false}
            />
          </div>
        </div>

        <Button
          normal
          className="align-self-end"
          onClick={() => setModalVisible(true)}
        >
          <span className="label md">Xóa</span>
        </Button>
      </div>

      <Modal
        title="Xóa phòng"
        open={modalVisible}
        onOk={handleDeleteShip}
        confirmLoading={confirmLoading}
        onCancel={() => setModalVisible(false)}
      >
        <p>Bạn có chắc chắn muốn xóa phòng này?</p>
      </Modal>
    </div>
  );
}

export default Delete;
