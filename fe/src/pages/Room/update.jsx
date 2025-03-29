import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select, notification } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import axios from "~/utils/axios.config";
import { handleGetRoomByIdApi } from "~/api";
import config from "~/config";
import Button from "~/components/Button";
import { LoadingContext } from "~/components/Loading/Loading";
import { InputField, SelectField, UploadImageField } from "~/components/Input";
import classNames from "classnames/bind";
import styles from "./Room.module.scss";
import { useCallback, useContext, useEffect } from "react";

const cx = classNames.bind(styles);

const { Option } = Select;
const beds = [
  {
    name: "giường đôi",
  },
  {
    name: "giường đơn",
  },
  {
    name: "2 giường đơn",
  },
  {
    name: "giường đôi và giường đơn",
  },
  {
    name: "giường đơn hoặc giường đôi",
  },
];

const views = [
  { name: "hướng thành phố" },
  {
    name: "hướng biển",
  },
];

const max_persons = [1, 2, 3, 4, 5];

function Update() {
  const navigate = useNavigate();
  const { slug, id } = useParams();
  const location = useLocation();
  const keywordParam = location.pathname.split("/")[1];

  const { setGlobalLoading } = useContext(LoadingContext);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(config.roomSchema),
  });

  const getRoom = useCallback(async () => {
    setGlobalLoading(true);
    const response = await handleGetRoomByIdApi(id);
    reset({
      title: response?.title,
      max_persons: response?.max_persons,
      default_price: response?.default_price,
      bed_type: response?.bed_type,
      view: response?.view,
      sale_prices: response?.sale_prices,
      size: response?.size,
      images: response.images.split(",").map((image) => image.trim()),
    });
    setGlobalLoading(false);
  }, [setGlobalLoading, id, reset]);

  useEffect(() => {
    getRoom();
  }, [getRoom]);

  const bedTypeOption = beds.map((bed, index) => (
    <Option key={index} value={bed.name}>
      {bed.name}
    </Option>
  ));

  const viewOption = views.map((view, index) => (
    <Option key={index} value={view.name}>
      {view.name}
    </Option>
  ));

  const maxPersonOption = max_persons.map((person, index) => (
    <Option key={index} value={person}>
      {person}
    </Option>
  ));

  const handleUpdateForm = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("max_persons", data.max_persons);
    formData.append("default_price", data.default_price);
    formData.append("bed_type", data.bed_type);
    formData.append("view", data.view);
    formData.append("sale_prices", data.sale_prices);
    formData.append("size", data.size);

    data.images.forEach((image) => formData.append("images", image));

    const response = await axios.put(`/rooms/update/${id}`, formData);
    if (response.statusCode === 200) {
      notification.success({
        message: response?.message || "Cập nhật thành công!",
      });
      navigate(`/${keywordParam}/${slug}/rooms`);
    }
  };

  return (
    <div className="flex w-full flex-col gap-16">
      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleUpdateForm)}
      >
        <div className="flex justify-between align-center">
          <h6>Cập nhật thông tin phòng</h6>
          <div className="flex align-center gap-16">
            <Button primary normal submit className="interceptor-loading">
              <div className="label md">Cập nhật</div>
            </Button>
            <Button primary normal to="features">
              <div className="label md">Cập nhật đặc trưng</div>
            </Button>
          </div>
        </div>
        <div
          className={cx("group-input")}
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          <div className="form-group">
            <InputField
              label="Tên phòng"
              type="text"
              name="title"
              placeholder="Nhập tên phòng..."
              control={control}
              error={errors.title}
              status={errors.title && "error"}
              inputGroup={false}
            />
          </div>

          <div className="form-group">
            <InputField
              label="Giá mặc định"
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
            <InputField
              label="Giá khuyến mãi (nếu có)"
              name="sale_prices"
              placeholder="Nhập giá"
              control={control}
              error={errors.sale_prices}
              status={errors.sale_prices && "error"}
              inputGroup={false}
              addonAfter="vnđ"
            />
          </div>
        </div>

        <div
          className={cx("group-input")}
          style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          <div className="form-group">
            <SelectField
              className="w-full"
              name="bed_type"
              label="Loại giường"
              placeholder="Chọn loại giường"
              control={control}
              error={errors.bed_type}
              status={errors.bed_type && "error"}
              options={bedTypeOption}
              onChange={(value) => setValue("bed_type", value)}
              popupMatchSelectWidth={false}
              required
            />
          </div>

          <div className="form-group">
            <SelectField
              className="w-full"
              name="view"
              label="View"
              placeholder="Chọn view"
              control={control}
              error={errors.view}
              status={errors.view && "error"}
              options={viewOption}
              onChange={(value) => setValue("view", value)}
              popupMatchSelectWidth={false}
            />
          </div>

          <div className="form-group">
            <SelectField
              className="w-full"
              name="max_persons"
              label="Số người tối đa"
              placeholder="Chọn số người tối đa"
              control={control}
              error={errors.max_persons}
              status={errors.max_persons && "error"}
              options={maxPersonOption}
              onChange={(value) => setValue("max_persons", value)}
              popupMatchSelectWidth={false}
            />
          </div>

          <div className="form-group">
            <InputField
              className="w-full"
              name="size"
              label="Diện tích (m²)"
              placeholder="Nhập số m²"
              control={control}
              error={errors.size}
              status={errors.size && "error"}
              inputGroup={false}
              required
            />
          </div>
        </div>

        {/* Nhóm thông tin hình ảnh */}
        <div className={cx("form-group")}>
          <UploadImageField
            label="Hình ảnh"
            name="images"
            control={control}
            error={errors.images}
            multiple
          />
        </div>
      </form>
    </div>
  );
}

export default Update;
