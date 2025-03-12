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
  } = useForm({ resolver: yupResolver(config.usersCataloguesSchema) });

  const getUserCatalogue = useCallback(async () => {
    setGlobalLoading(true);
    const { userCatalogue } = await axios.get(`/users-catalogues/${id}`);
    reset({
      name: userCatalogue.name,
      description: userCatalogue.description,
    });
    setGlobalLoading(false);
  }, [setGlobalLoading, reset, id]);

  useEffect(() => {
    getUserCatalogue();
  }, [getUserCatalogue]);

  const handleUpdateUsersCataloguesForm = async (data) => {
    const response = await axios.put(`/users-catalogues/update/${id}`, data);
    if (response.statusCode === 200) {
      notification.success({
        message: response?.message || "Cập nhật vai trò thành công!",
      });
      navigate("/users-catalogues");
    }
  };

  return (
    <div className="flex w-full flex-col gap-16">
      <h6>Cập nhật thông tin vai trò</h6>

      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleUpdateUsersCataloguesForm)}
      >
        <div className="group-input" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className="form-group">
            <InputField
              label="Họ tên"
              type="text"
              name="name"
              placeholder="Nhập tên vai trò..."
              control={control}
              error={errors.name}
              required
              status={errors.name && "error"}
              inputGroup={false}
            />
          </div>

          <div className="form-group">
            <InputField
              label="Mô tả"
              type="text"
              name="description"
              placeholder="Nhập description..."
              control={control}
              error={errors.description}
              required
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
          <div className="label md">Cập nhật</div>
        </Button>
      </form>
    </div>
  );
}

export default Update;
