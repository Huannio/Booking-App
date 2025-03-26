import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { notification, Modal } from "antd";
import { InputField } from "~/components/Input";
import Button from "~/components/Button";
import axios from "~/utils/axios.config";

import { LoadingContext } from "~/components/Loading/Loading";
import { handleGetHotelBySlugApi } from "~/api";

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

  const getHotel = useCallback(async () => {
    setGlobalLoading(true);
    const response = await handleGetHotelBySlugApi(slug);
    reset({ title: response?.data?.title });
    setGlobalLoading(false);
  }, [setGlobalLoading, slug, reset]);

  useEffect(() => {
    getHotel();
  }, [getHotel]);

  const handleDeleteShip = async () => {
    setConfirmLoading(true);
    const response = await axios.delete(`/hotel/delete/${slug}`);
    if (response.statusCode === 200) {
      notification.success({ message: "Xóa khách sạn thành công!" });
      navigate("/hotel");
    }
    setConfirmLoading(false);
    setModalVisible(false);
  };

  return (
    <div className="flex w-full flex-col gap-16">
      <h6>Xóa khách sạn</h6>

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
              label="Tên khách sạn"
              type="text"
              name="title"
              placeholder="Nhập tên khách sạn..."
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
        title="Xóa khách sạn"
        open={modalVisible}
        onOk={handleDeleteShip}
        confirmLoading={confirmLoading}
        onCancel={() => setModalVisible(false)}
      >
        <p>Bạn có chắc chắn muốn xóa khách sạn này?</p>
      </Modal>
    </div>
  );
}

export default DeleteShip;