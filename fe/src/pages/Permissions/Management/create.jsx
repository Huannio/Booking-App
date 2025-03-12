import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { notification } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "~/utils/axios.config";
import { InputField } from "~/components/Input";
import Button from "~/components/Button";
import config from "~/config";

function Create() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(config.permissionSchema),
  });

  const handleCreatePermissionForm = async (data) => {
    const response = await axios.post("/permissions-management/create", data);

    if (response.statusCode === 201) {
      notification.success({
        message: response?.data?.message || "Tạo thành công!",
      });
      reset();
      navigate("/permissions-management");
    }
  };

  return (
    <div className="flex w-full flex-col gap-16">
      <h6>Tạo mới quyền</h6>

      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleCreatePermissionForm)}
      >
        <div className="group-input">
          <div className="form-group">
            <InputField
              label="Tên quyền"
              type="text"
              name="name"
              placeholder="Nhập tên quyền..."
              control={control}
              error={errors.name}
              status={errors.name && "error"}
              inputGroup={false}
            />
          </div>

          <div className="form-group">
            <InputField
              label="Đường dẫn"
              type="canonical"
              name="canonical"
              placeholder="Nhập canonical..."
              control={control}
              error={errors.canonical}
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
          <div className="label md">Tạo</div>
        </Button>
      </form>
    </div>
  );
}

export default Create;
