import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Select, notification } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "~/utils/axios.config";
import { InputField, SelectField } from "~/components/Input";
import Button from "~/components/Button";
import config from "~/config";
import { LoadingContext } from "~/components/Loading/Loading";

const { Option } = Select;

function Create() {
  const navigate = useNavigate();
  const { setGlobalLoading } = useContext(LoadingContext);
  const [userCatalogues, setUserCatalogues] = useState(null);

  const getUserCatalogues = useCallback(async () => {
    setGlobalLoading(true);
    const { userCatalogues } = await axios.get("/users-catalogues");
    setUserCatalogues(userCatalogues || []);
    setGlobalLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {

    getUserCatalogues();
  }, [getUserCatalogues]);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(config.userSchema),
  });

  const handleCreateUserForm = async (data) => {
    const response = await axios.post("/users/create", data);

    if (response.statusCode === 200) {
      notification.success({
        message: response?.data?.message || "Tạo người dùng thành công!",
      });
      reset();
      navigate("/users");
    }
  };

  const roleOptions =
    userCatalogues?.map((user_catalogues) => (
      <Option key={user_catalogues.id} value={user_catalogues.id}>
        {user_catalogues.name}
      </Option>
    )) || [];

  return (
    <div className="flex w-full flex-col gap-16">
      <h6>Tạo mới người dùng</h6>

      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleCreateUserForm)}
      >
        <div className="group-input">
          <div className="form-group">
            <InputField
              label="Họ tên"
              type="text"
              name="name"
              placeholder="Nhập tên người dùng..."
              control={control}
              error={errors.name}
              status={errors.name && "error"}
              inputGroup={false}
            />
          </div>

          <div className="form-group">
            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="Nhập email..."
              control={control}
              error={errors.email}
              status={errors.email && "error"}
              inputGroup={false}
            />
          </div>
        </div>

        <div className="group-input">
          <div className="form-group">
            <SelectField

              name="user_catalogues_id"
              label="Chọn vai trò"
              placeholder="Chọn một vai trò"
              control={control}
              error={errors.user_catalogues_id}
              status={errors.user_catalogues_id && "error"}
              options={roleOptions}
              onChange={(value) => setValue("user_catalogues_id", value)}
              loading={!userCatalogues}
            />
          </div>
        </div>


        <Button
          primary
          normal
          submit
          className="align-self-end interceptor-loading"
        >
          <div className="label md">Tạo</div>
        </Button>
      </form>
    </div>
  );
}

export default Create;
