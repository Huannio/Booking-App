import { useState, useContext, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Select, notification } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";

import axios from "~/utils/axios.config";
import { LoadingContext } from "~/components/Loading/Loading";
import Button from "~/components/Button";
import styles from "./Ship.module.scss";
import config from "~/config";
import {
  InputField,
  SelectField,
  TextField,
  UploadImageField,
  UploadThumbnailField,
} from "~/components/Input";
import { handleGetCruiseCategoryApi } from "~/api";
import { handleGetShipBySlugApi } from "../../api";

const cx = classNames.bind(styles);
const { Option } = Select;

const shells = [
  {
    name: "Gỗ",
  },
  {
    name: "Kim loại",
  },
  {
    name: "Sắt",
  },
];

function Update() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(config.cruiseSchema),
  });

  const [cruiseCategory, setCruiseCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setGlobalLoading } = useContext(LoadingContext);

  const { slug } = useParams();
  const getShipBySlug = useCallback(async () => {
    setGlobalLoading(true);
    setLoading(true);
    const response = await handleGetShipBySlugApi(slug);
    reset({
      address: response.ship.address,
      admin: response.ship.cruise.admin,
      cabin: response.ship.cruise.cabin,
      cruise_category: response.ship.cruise.cruise_category.id,
      default_price: response.ship.default_price,
      map_iframe_link: response.ship.map_iframe_link,
      map_link: response.ship.map_link,
      schedule: response.ship.schedule,
      shell: response.ship.cruise.shell,
      thumbnail: response.ship.thumbnail,
      title: response.ship.title,
      trip: response.ship.cruise.trip,
      year: response.ship.cruise.year,
      images: response.ship.images.split(",").map((image) => image.trim()),
    });
  }, [setGlobalLoading, reset, slug]);

  const getCruiseCategory = useCallback(async () => {
    setGlobalLoading(true);
    setLoading(true);
    const response = await handleGetCruiseCategoryApi();
    setCruiseCategory(response.cruiseCategory || []);
    setGlobalLoading(false);
    setLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {
    getCruiseCategory();
    getShipBySlug();
  }, [getCruiseCategory, getShipBySlug]);

  const cruiseCategoryOptions = cruiseCategory.map((cruiseCategory, index) => (
    <Option key={index} value={cruiseCategory.id}>
      {cruiseCategory.name}
    </Option>
  ));

  const shellOptions = shells.map((shell, index) => (
    <Option key={index} value={shell.name}>
      {shell.name}
    </Option>
  ));

  // Xử lý submit form
  const handleUpdateShipForm = async (data) => {
    const formData = new FormData();
    formData.append("address", data.address);
    formData.append("admin", data.admin);
    formData.append("cabin", data.cabin);
    formData.append("cruise_category", data.cruise_category);
    formData.append("default_price", data.default_price);
    formData.append("map_iframe_link", data.map_iframe_link);
    formData.append("map_link", data.map_link);
    formData.append("schedule", data.schedule);
    formData.append("shell", data.shell);
    formData.append(
      "thumbnail",
      typeof data.thumbnail === "string" ? data.thumbnail : data.thumbnail[0]
    );
    formData.append("title", data.title);
    formData.append("trip", data.trip);
    formData.append("year", data.year);

    data.images.forEach((image) => formData.append("images", image));

    const response = await axios.put(`/ships/update/${slug}`, formData);
    if (response.statusCode === 200) {
      notification.success({
        message:
          response?.message || "Cập nhật thông tin du thuyền thành công!",
      });
      navigate("/ships");
    }
  };

  return (
    <div className="flex w-full flex-col gap-16">
      <form
        className="flex flex-col gap-32"
        onSubmit={handleSubmit(handleUpdateShipForm)}
      >
        <div className="flex justify-between align-center">
          <h6>Tạo mới thông tin du thuyền</h6>
          <div style={{position: "absolute", right: "125px"}}>
          <Link to={`/ships/updateFeature/${slug}`}>
            <Button primary normal className="interceptor-loading">
              <div className="label md">Tạo đặc trưng du thuyền</div>
            </Button>
          </Link>
          </div>
          <Button primary normal submit className="interceptor-loading">
            <div className="label md">Tạo</div>
          </Button>
        </div>
        <div className={cx("group-input")}>
          <div className="form-group">
            <InputField
              label="Tên du thuyền"
              type="text"
              name="title"
              placeholder="Nhập tên du thuyền..."
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

        <div className={cx("group-input")}>
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

        {/* Nhóm thông tin lịch trình và giá */}
        <div className={cx("group-input")}>
          <div className="form-group">
            <InputField
              label="Lịch trình"
              name="schedule"
              placeholder="Nhập lịch trình. Ví dụ: 2 ngày 1 đêm."
              control={control}
              error={errors.schedule}
              status={errors.schedule && "error"}
              inputGroup={false}
              required
            />
          </div>

          <div className="form-group">
            <InputField
              label="Hành trình"
              name="trip"
              placeholder="Nhập hành trình. Ví dụ: Vịnh Lan Hạ - Bãi tắm Ba Trái Đào - Hang Sáng Tối"
              control={control}
              error={errors.trip}
              status={errors.trip && "error"}
              inputGroup={false}
              required
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
              name="shell"
              label="Thân vỏ"
              placeholder="Chọn loại thân vỏ"
              control={control}
              error={errors.shell}
              status={errors.shell && "error"}
              options={shellOptions}
              onChange={(value) => setValue("shell", value)}
              popupMatchSelectWidth={false}
              required
            />
          </div>

          <div className="form-group">
            <SelectField
              className="w-full"
              name="cruise_category"
              label="Danh mục du thuyền"
              placeholder="Chọn danh mục du thuyền"
              control={control}
              error={errors.cruise_category}
              status={errors.cruise_category && "error"}
              options={cruiseCategoryOptions}
              onChange={(value) => setValue("cruise_category", value)}
              popupMatchSelectWidth={false}
              loading={loading}
              required
            />
          </div>

          <div className="form-group">
            <InputField
              label="Số lượng người trên cabin"
              name="cabin"
              placeholder="Nhập số lượnglượng"
              control={control}
              error={errors.cabin}
              status={errors.cabin && "error"}
              inputGroup={false}
              required
            />
          </div>

          <div className="form-group">
            <InputField
              label="Năm hạ thủy du thuyền"
              name="year"
              placeholder="Nhập năm hạ thủy của du thuyền..."
              control={control}
              error={errors.year}
              status={errors.year && "error"}
              inputGroup={false}
              required
            />
          </div>
        </div>

        {/* Nhóm thông tin hình ảnh */}
        <div className={cx("group-input")}>
          <div className={cx("form-group")}>
            <UploadThumbnailField
              label="Thumbnail"
              name="thumbnail"
              control={control}
              error={errors.thumbnail}
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

export default Update;
