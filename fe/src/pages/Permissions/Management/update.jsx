import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { notification } from "antd";
import { InputField } from "~/components/Input";
import Button from "~/components/Button";
import config from "~/config";
import axios from "~/utils/axios.config";
import { useEffect, useCallback, useContext } from "react";
import { LoadingContext } from "~/components/Loading/Loading";

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setGlobalLoading } = useContext(LoadingContext);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(config.permissionSchema) });

  const getpermission = useCallback(async () => {
    setGlobalLoading(true);
    const response = await axios.get(`/permissions-management/${id}`);
    reset({
      name: response.data.name,
      canonical: response.data.canonical,
    });
    setGlobalLoading(false);
  }, [id, reset, setGlobalLoading]);

  useEffect(() => {
    getpermission();
  }, [getpermission]);

  const handleUpdatePermissionForm = async (data) => {
    const response = await axios.put(
      `/permissions-management/update/${id}`,
      data
    );
    if (response.statusCode === 200) {
      notification.success({
        message: response?.message || "Cập nhật thành công!",
      });
      navigate("/permissions-management");
    }
  };

  return (
    <div className="flex w-full flex-col gap-16">
      <h6>Cập nhật thông tin quyền</h6>

      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleUpdatePermissionForm)}
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
              label="Đường dẫn"
              type="canonical"
              name="canonical"
              placeholder="Nhập đường dẫn..."
              control={control}
              error={errors.canonical}
              required
              status={errors.canonical && "error"}
              inputGroup={false}
            />
          </div>
        </div>

        <Button
          primary
          normal
          submit
          className="align-self-end interceptor-loading"
        >
          <div className="label md">Cập nhật</div>
        </Button>
      </form>
    </div>
  );
}

export default Update;
