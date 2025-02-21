import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { notification, Modal } from "antd";
import { InputField } from "~/components/Input";
import Button from "~/components/Button";
import axios from "~/utils/axios.config";
import { useCallback, useContext, useEffect, useState } from "react";
import { LoadingContext } from "~/components/Loading/Loading";

function Delete() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setGlobalLoading } = useContext(LoadingContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const {
    control,
    reset,
    formState: { errors },
  } = useForm();

  const getOneUser = useCallback(async () => {
    setGlobalLoading(true);
    const response = await axios.get(`/users/${id}`);

    reset({ name: response?.user?.name });
    setGlobalLoading(false);
  }, [id, reset, setGlobalLoading]);

  useEffect(() => {
    getOneUser();
  }, [getOneUser]);

  const deleteUser = async () => {
    setConfirmLoading(true);
    const response = await axios.delete(`/users/delete/${id}`);

    if (response.statusCode === 200) {
      notification.success({ message: response?.message });
      navigate("/users");
    }
    setConfirmLoading(false);
    setModalVisible(false);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-16">
        <h6>Xóa người dùng</h6>

        <div className="flex flex-col gap-32">
          <div className="group-input">
            <div className="warning-title">
              <p className="subheading lg" style={{ color: "red" }}>
                Lưu ý: Một khi xóa sẽ không thể khôi phục, hãy cân nhắc trước
                khi xóa!
              </p>
            </div>
            <div className="form-group">
              <InputField
                label="Họ tên"
                type="text"
                name="name"
                placeholder="type user name here..."
                control={control}
                error={errors.name}
                disabled
                inputGroup={false}
              />
            </div>
          </div>

          <Button
            normal
            className="align-self-end interceptor-loading"
            onClick={() => setModalVisible(true)}
          >
            <span className="label md">Xóa</span>
          </Button>
        </div>
      </div>

      <Modal
        title="Xóa người dùng"
        open={modalVisible}
        onOk={deleteUser}
        confirmLoading={confirmLoading}
        onCancel={() => setModalVisible(false)}
      >
        <p>Bạn có chắc chắn muốn xóa?</p>
      </Modal>
    </>
  );
}

export default Delete;
