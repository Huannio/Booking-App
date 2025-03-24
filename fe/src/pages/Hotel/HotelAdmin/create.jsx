import { useCallback, useContext, useEffect, useState } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { notification, Select } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";

import axios from "~/utils/axios.config";
import Button from "~/components/Button";
import styles from "./Hotel.module.scss";
import config from "~/config";
import {
  InputField,
  TextField,
  UploadImageField,
  SelectField,
} from "~/components/Input";
import { handleGetCityApi } from "~/api";

const cx = classNames.bind(styles);
const { Option } = Select;

function Create() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(config.hotelSchema),
  });

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setGlobalLoading } = useContext(LoadingContext);

  const getCities = useCallback(async () => {
    setGlobalLoading(true);
    setLoading(true);
    const response = await handleGetCityApi();
    setCities(response.data || []);
    setGlobalLoading(false);
    setLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {
    getCities();
  }, [getCities]);

  const cityOptions = cities.map((city, index) => (
    <Option key={index} value={city.id}>
      {city.name}
    </Option>
  ));

  // Xử lý submit form
  const handleCreateHotelForm = async (data) => {
    const formData = new FormData();
    formData.append("address", data.address);
    formData.append("admin", data.admin);
    formData.append("default_price", data.default_price);
    formData.append("map_iframe_link", data.map_iframe_link);
    formData.append("map_link", data.map_link);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("title", data.title);
    formData.append("cities", data.cities);

    data.images.forEach((image) => formData.append("images", image));
    const response = await axios.post("/hotel/create", formData);
    if (response.statusCode === 201) {
      notification.success({
        message: response?.message || "Tạo thông tin khách sạn thành công!",
      });
      navigate("/hotel");
    }
  };

  return (
    <div className="flex w-full flex-col gap-16">
      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleCreateHotelForm)}
      >
        <div className="flex justify-between align-center">
          <h6>Tạo mới thông tin khách sạn</h6>
          <Button primary normal submit className="interceptor-loading">
            <div className="label md">Tạo</div>
          </Button>
        </div>
        <div className={cx("group-input")}>
          <div className="form-group">
            <InputField
              label="Tên khách sạn"
              type="text"
              name="title"
              placeholder="Nhập tên khách sạn..."
              control={control}
              error={errors.title}
              status={errors.title && "error"}
              inputGroup={false}
            />
          </div>

          <div className="form-group">
            <InputField
              label="Địa chỉ"
              type="address"
              name="address"
              placeholder="Nhập địa chỉ..."
              control={control}
              error={errors.address}
              status={errors.address && "error"}
              inputGroup={false}
            />
          </div>
        </div>

        <div
          className={cx("group-input")}
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          <div className="form-group">
            <InputField
              label="Tên công ty điều hành"
              type="admin"
              name="admin"
              placeholder="Nhập tên công ty điều hành..."
              control={control}
              error={errors.admin}
              status={errors.admin && "error"}
              inputGroup={false}
            />
          </div>

          <div className="form-group">
            <InputField
              label="Giá"
              name="default_price"
              placeholder="Nhập giá"
              control={control}
              error={errors.default_price}
              status={errors.default_price && "error"}
              inputGroup={false}
              required
              addonAfter="vnđ"
            />
          </div>

          <div className="form-group">
            <SelectField
              className="w-full"
              name="cities"
              label="Thành phố"
              placeholder="Chọn thành phố"
              control={control}
              error={errors.cities}
              status={errors.cities && "error"}
              options={cityOptions}
              onChange={(value) => setValue("cities", value)}
              popupMatchSelectWidth={false}
              loading={loading}
              required
            />
          </div>
        </div>

        {/* Nhóm thông tin bản đồ */}
        <div className={cx("group-input")}>
          <div className="form-group">
            <TextField
              label="Link bản đồ"
              name="map_link"
              placeholder="Nhập link bản đồ google map"
              control={control}
              error={errors.map_link}
              status={errors.map_link && "error"}
            />
          </div>

          <div className="form-group">
            <TextField
              label="Map Iframe Link"
              name="map_iframe_link"
              placeholder="Nhập link nhúng bản đồ google map cho thẻ iframe"
              control={control}
              error={errors.map_iframe_link}
              status={errors.map_iframe_link && "error"}
            />
          </div>
        </div>

        {/* Nhóm thông tin hình ảnh */}
        <div className={cx("group-input")}>
          <div className={cx("form-group")}>
            <UploadImageField
              label="Thumbnail"
              name="thumbnail"
              control={control}
              error={errors.thumbnail}
              variant="thumbnail"
            />
          </div>

          <div className={cx("form-group")}>
            <UploadImageField
              label="Hình ảnh"
              name="images"
              control={control}
              error={errors.images}
              multiple
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create;
