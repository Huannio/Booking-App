import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select, notification } from "antd";
import { InputField, SelectField } from "~/components/Input";
import Button from "~/components/Button";
import config from "~/config";
import axios from "~/utils/axios.config";
import { useEffect, useState, useCallback, useMemo, useContext } from "react";
import { LoadingContext } from "~/components/Loading/Loading";

const { Option } = Select;

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setGlobalLoading } = useContext(LoadingContext);
  const [roles, setRoles] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(config.userSchema) });

  const getRoles = useCallback(async () => {
    setGlobalLoading(true);
    const { roles } = await axios.get("/roles");
    setRoles(roles || []);
    setGlobalLoading(false);
  }, [setGlobalLoading]);

  const getOneUser = useCallback(async () => {
    setGlobalLoading(true);
    const response = await axios.get(`/users/${id}`);
    reset({
      name: response.data.name,
      email: response.data.email,
      role_id: response.data.roles.id,
    });
    setGlobalLoading(false);
  }, [id, reset, setGlobalLoading]);

  useEffect(() => {
    getRoles();
    getOneUser();
  }, [getRoles, getOneUser]);

  const handleUpdateUserForm = async (data) => {
    const response = await axios.put(`/users/update/${id}`, data);

    notification.success({
      message: response?.data?.message || "Cập nhật người dùng thành công!",
    });
    navigate("/users");
  };

  const roleOptions = useMemo(
    () =>
      roles?.map((role) => (
        <Option key={role.id} value={role.id}>
          {role.name}
        </Option>
      )) || [],
    [roles]
  );

  return (
    <div className="flex w-full flex-col gap-16">
      <h6>Cập nhật thông tin người dùng</h6>

      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleUpdateUserForm)}
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
              required
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
              required
              status={errors.email && "error"}
              inputGroup={false}
            />
          </div>
        </div>

        <div className="group-input">
          <div className="form-group">
            <SelectField
              name="role_id"
              label="Chọn vai trò"
              placeholder="Chọn một vai trò"
              control={control}
              error={errors.role_id}
              options={roleOptions}
              onChange={(value) => setValue("role_id", value)}
              loading={!roles}
              required
            />
          </div>
        </div>

        <Button primary normal submit className="align-self-end interceptor-loading">
          <div className="label md">Cập nhật</div>
        </Button>
      </form>
    </div>
  );
}

export default Update;
