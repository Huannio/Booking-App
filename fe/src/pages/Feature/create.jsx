import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Select, notification } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "~/utils/axios.config";
import { InputField, SelectField, UploadImageField } from "~/components/Input";
import Button from "~/components/Button";
import config from "~/config";
import { LoadingContext } from "~/components/Loading/Loading";
import { handleGetFeatureTypesApi } from "~/api";

const { Option } = Select;

function Create() {
  const navigate = useNavigate();
  const { setGlobalLoading } = useContext(LoadingContext);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(config.featureSchema),
  });

  const handleCreateFeatureForm = async (data) => {
    console.log(data);
    
    const formData = new FormData();
    formData.append("text", data.text);
    formData.append("type", data.type);
    formData.append("icon", data.icon[0]);
    const response = await axios.post("/features/create", formData);

    if (response.statusCode === 201) {
      notification.success({
        message:
          response?.data?.message || "Tạo thông tin đặc trưng thành công!",
      });
      reset();
      navigate("/features");
    }
  };

  const [featureTypes, setFeaturesTypes] = useState(null);
  const getFeaturesTypes = useCallback(async () => {
    setGlobalLoading(true);
    const featureTypes = await handleGetFeatureTypesApi();
    setFeaturesTypes(featureTypes);
    setGlobalLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {
    getFeaturesTypes();
  }, [getFeaturesTypes]);
  
  const featureTypesOptions =
  featureTypes?.map((featureType) => (
      <Option key={featureType.id} value={featureType.id}>
        {featureType.name}
      </Option>
    )) || [];

  return (
    <div className="flex w-full flex-col gap-16">
      <h6>Tạo mới đặc trưng</h6>

      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleCreateFeatureForm)}
      >
        <div className="group-input">
          <div className="form-group">
            <InputField
              label="Tên đặc trưng"
              type="text"
              name="text"
              placeholder="Nhập tên đặc trưng..."
              control={control}
              error={errors.text}
              status={errors.text && "error"}
              inputGroup={false}
            />
          </div>

          <div className="form-group">
            <SelectField
              label="Chọn loại đặc trưng"
              name="type"
              placeholder="Chọn loại đặc trưng..."
              control={control}
              error={errors.type}
              status={errors.type && "error"}
              options={featureTypesOptions}
              loading={!featureTypesOptions}
              onChange={(value) => setValue("type", value)}
              required
            />
          </div>
        </div>

        <div className="group-input">
          <div className="form-group">
            <UploadImageField
              label="icon"
              name="icon"
              control={control}
              error={errors.icon}
              status={errors.icon && "error"}
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
