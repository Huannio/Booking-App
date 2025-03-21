import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { notification, Modal } from "antd";
import { InputField } from "~/components/Input";
import Button from "~/components/Button";
import axios from "~/utils/axios.config";

import { LoadingContext } from "~/components/Loading/Loading";
import { handleGetShipBySlugApi } from "~/api";

function DeleteShip() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { setGlobalLoading } = useContext(LoadingContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const {
    control,
    reset,
    formState: { errors },
  } = useForm();

  // Lấy thông tin du thuyền theo ID
  const getShip = useCallback(async () => {
    setGlobalLoading(true);
    const response = await handleGetShipBySlugApi(slug);
    reset({ title: response?.ship?.title });
    setGlobalLoading(false);
  }, [setGlobalLoading, slug, reset]);

  useEffect(() => {
    getShip();
  }, [getShip]);

  // Xử lý xóa du thuyền
  const handleDeleteShip = async () => {
    setConfirmLoading(true);
    const response = await axios.delete(`/ships/delete/${slug}`);
    if (response.statusCode === 200) {
      notification.success({ message: "Xóa du thuyền thành công!" });
      navigate("/ships");
    }
    setConfirmLoading(false);
    setModalVisible(false);
  };

  return (
    <div className="flex w-full flex-col gap-16">
      <h6>Xóa du thuyền</h6>

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
              label="Tên du thuyền"
              type="text"
              name="title"
              placeholder="Nhập tên du thuyền..."
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
        title="Xóa du thuyền"
        open={modalVisible}
        onOk={handleDeleteShip}
        confirmLoading={confirmLoading}
        onCancel={() => setModalVisible(false)}
      >
        <p>Bạn có chắc chắn muốn xóa du thuyền này?</p>
      </Modal>
    </div>
  );
}

export default DeleteShip;
