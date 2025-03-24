import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select, notification } from "antd";
import { InputField, SelectField, UploadImageField } from "~/components/Input";
import Button from "~/components/Button";
import config from "~/config";
import axios from "~/utils/axios.config";
import { useEffect, useState, useCallback, useContext } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import { handleGetFeatureByIdApi, handleGetFeatureTypesApi } from "~/api";

const { Option } = Select;

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setGlobalLoading } = useContext(LoadingContext);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(config.featureSchema) });

  const [featureType, setFeatureType] = useState(null);
  const getFeatureType = useCallback(async () => {
    setGlobalLoading(true);
    const featureType = await handleGetFeatureTypesApi();
    setFeatureType(featureType);
    setGlobalLoading(false);
  }, [setGlobalLoading]);

  const getFeature = useCallback(async () => {
    setGlobalLoading(true);
    setGlobalLoading(true);
    const response = await handleGetFeatureByIdApi(id);
    reset({
      text: response.feature.text,
      type: response.feature.type,
      icon: response.feature.icon,
    });
    setGlobalLoading(false);
  }, [id, reset, setGlobalLoading]);

  useEffect(() => {
    getFeatureType();
    getFeature();
  }, [getFeatureType, getFeature]);

  const featureTypeOptions =
    featureType?.map((featureType) => (
      <Option key={featureType.id} value={featureType.id}>
        {featureType.type}
      </Option>
    )) || [];

  const handleUpdateFeatureForm = async (data) => {
    let formData = new FormData();
    formData.append("text", data.text);
    formData.append("type", data.type);
    formData.append("icon", data.icon[0]);
    const response = await axios.put(`/features/update/${id}`, formData);
    if (response.statusCode === 200) {
      notification.success({
        message: response?.message || "Cập nhật đặc trưngtrưng thành công!",
      });
      navigate("/features");
    }
  };

  return (
    <div className="flex w-full flex-col gap-16">
      <h6>Cập nhật thông tin đặc trưng</h6>

      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleUpdateFeatureForm)}
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
              options={featureTypeOptions}
              loading={!featureTypeOptions}
              onChange={(value) => setValue("type", value)}
              required
            />
          </div>
        </div>

        <div className="group-input">
          <UploadImageField
            label="icon"
            name="icon"
            control={control}
            error={errors.icon}
            status={errors.icon && "error"}
            variant="thumbnail"
          />
        </div>

        <div className="flex justify-end gap-16">
          <Button
            primary
            normal
            submit
            className="align-self-end interceptor-loading"
          >
            <div className="label md">Cập nhật</div>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Update;
