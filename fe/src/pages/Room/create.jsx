
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select, notification } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import axios from "~/utils/axios.config";
import config from "~/config";
import Button from "~/components/Button";
import {
  InputField,
  SelectField,
  UploadImageField,
} from "~/components/Input";
import classNames from "classnames/bind";
import styles from "./Room.module.scss";

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

function Create() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const location = useLocation();
  const keywordParam = location.pathname.split("/")[1];

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(config.roomSchema),
  });

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

  const handleCreateForm = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("max_persons", data.max_persons);
    formData.append("default_price", data.default_price);
    formData.append("bed_type", data.bed_type);
    formData.append("view", data.view);
    formData.append("sale_prices", data.sale_prices);
    formData.append("size", data.size);

    data.images.forEach((image) => formData.append("images", image));

    const response = await axios.post(`/rooms/create/${slug}`, formData);
    if (response.statusCode === 201) {
      notification.success({
        message: response?.message || "Tạo thành công!",
      });
      navigate(`/${keywordParam}/${slug}/rooms`);
    }
  };

  return (
    <div className="flex w-full flex-col gap-16">
      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleCreateForm)}
      >
        <div className="flex justify-between align-center">
          <h6>Tạo mới thông tin phòng</h6>
          <Button primary normal submit className="interceptor-loading">
            <div className="label md">Tạo</div>
          </Button>
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

export default Create;
