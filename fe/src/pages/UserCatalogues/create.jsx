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
    resolver: yupResolver(config.usersCataloguesSchema),
  });

  const handleCreateUsersCataloguesForm = async (data) => {
    const response = await axios.post("/users-catalogues/create", data);

    if (response.statusCode === 201) {
      notification.success({
        message: response?.data?.message || "Tạo vai trò thành công!",
      });
      reset();
      navigate("/users-catalogues");
    }
  };

  return (
    <div className="flex w-full flex-col gap-16">
      <h6>Tạo mới vai trò</h6>

      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleCreateUsersCataloguesForm)}
      >
        <div className="group-input" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className="form-group">
            <InputField
              label="Tên vai trò"
              type="text"
              name="name"
              placeholder="Nhập tên vai trò..."
              control={control}
              error={errors.name}
              status={errors.name && "error"}
              inputGroup={false}
            />
          </div>

          <div className="form-group">
            <InputField
              label="Mô tả"
              type="text"
              name="description"
              placeholder="Nhập mô tả vai trò..."
              control={control}
              error={errors.description}
              status={errors.description && "error"}
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
