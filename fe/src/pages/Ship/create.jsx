import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {Select, notification } from "antd";
import { InputField, SelectField, UploadField, OptionField } from "~/components/Input";
import axios from "~/utils/axios.config";
import Button from "~/components/Button";
import config from "~/config";
import { LoadingContext } from "~/components/Loading/Loading";
import { handleGetShipTypesApi, handleGetCruiseCategoryApi } from "~/api";
import classNames from "classnames/bind";
import styles from "./Ship.module.scss";
const cx = classNames.bind(styles);

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
    resolver: yupResolver(config.shipSchema),
  });
  
  const handleCreateShipForm = async (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("address", data.address);
    formData.append("map_link", data.map_link);
    formData.append("map_iframe_link", data.map_iframe_link);
    formData.append("default_price", data.default_price);
    formData.append("slug", data.slug);
    formData.append("schedule", data.schedule);
    formData.append("thumbnail", data.thumbnail);
    formData.append("images", data.images);
    formData.append("type_product", data.type_product);
    formData.append("active", data.active);
    const response = await axios.post("/ships/create", formData);

    if (response.statusCode === 201) {
      notification.success({
        message: response?.data?.message || "Tạo thông tin du thuyền thành công!",
      });
      reset();
      navigate("/ships");
    }
  };

  const [shipTypes, setShipTypes] = useState(null);
  const getShipTypes = useCallback(async () => {
    setGlobalLoading(true);
    const shipTypes = await handleGetShipTypesApi();
    setShipTypes(shipTypes);
    setGlobalLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {
    getShipTypes();
  }, [getShipTypes]);
    
  const shipTypesOptions = shipTypes?.map((shipType) => (
    <Option key={shipType.id} value={shipType.id}>
      {shipType.name}
    </Option>
  )) || [];

  const [cruiseCategory, setCruiseCategory] = useState(null);
  const getCruiseCategory = useCallback(async () => {
    setGlobalLoading(true);
    const cruiseCategory = await handleGetCruiseCategoryApi();
    setCruiseCategory(cruiseCategory);
    setGlobalLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {
    getCruiseCategory();
  }, [getCruiseCategory]);
    
  const cruiseCategoryOptions = cruiseCategory?.map((cruiseCategory) => (
    <Option key={cruiseCategory.id} value={cruiseCategory.id}>
      {cruiseCategory.name}
    </Option>
  )) || [];

  return (
    <div className={cx("action-page")}>
      <form
        className={cx("flex flex-col gap-32")}
        onSubmit={handleSubmit(handleCreateShipForm)}
      >
        <div className={cx("modal")}>
          <h6>Tạo mới du thuyền</h6>
          <div className={cx("divider")} style={{ borderBottom: "1px solid var(--gray-200, #eaecf0)" }}></div>

          <div className={cx("group-input")}>
            <div className={cx("form-group")}> 
              <InputField
                label="Tiêu đề"
                type="title"
                name="title"
                placeholder="Nhập tiêu đề"
                control={control}
                error={errors.title} 
                status={errors.title && "error"}
              />
            </div>

            <div className={cx("form-group")}>
              <InputField
                label="Địa chỉ"
                type="address"
                name="address"
                placeholder="Nhập địa chỉ"
                control={control}
                error={errors.address} 
                status={errors.address && "error"}
              />
            </div>
          </div>

          <div className={cx("group-input-3")}>
            <div className={cx("form-group")}>
              <InputField
                label="Thân vỏ"
                type="shell"
                name="shell"
                placeholder="Nhập vật liệu thân vỏ"
                control={control}
                error={errors.shell} 
                status={errors.shell && "error"}
              />
            </div>

            <div className={cx("form-group")}>
              <InputField
                label="Năm hạ thủy"
                type="year"
                name="year"
                placeholder="Nhập năm hạ thủy"
                control={control}
                error={errors.year} 
                status={errors.year && "error"}
              />
            </div>

            
            
            <div className={cx("form-group")}>
              <InputField
                label="Tên công ty điều hành"
                type="admin"
                name="admin"
                placeholder="Nhập tên công ty điều hành"
                control={control}
                error={errors.admin} 
                status={errors.admin && "error"}
              />
            </div>
          </div>

          <div className={cx("group-input")}>
            <div className={cx("form-group")}>
              <InputField
                label="Map Link"
                type="map_link"
                name="map_link"
                placeholder="Nhập link bản đồ google map"
                control={control}
                error={errors.map_link} 
                status={errors.map_link && "error"}
              />
            </div>

            <div className={cx("form-group")}>
              <InputField
                label="Map Iframe Link"
                type="map_iframe_link"
                name="map_iframe_link"
                placeholder="Nhập link nhúng bản đồ google map cho thẻ iframe"
                control={control}
                error={errors.map_iframe_link} 
                status={errors.map_iframe_link && "error"}
              />
            </div>
          </div>

          <div className={cx("group-input-3")}>
          <div className={cx("form-group")}>
              <InputField
                label="Cabin"
                type="cabin"
                name="cabin"
                placeholder="Nhập số lượng cabin"
                control={control}
                error={errors.cabin} 
                status={errors.cabin && "error"}
              />
            </div>
            <div className={cx("form-group")}>
              <InputField
                label="Lịch trình"
                type="schedule"
                name="schedule"
                placeholder="Nhập lịch trình. Ví dụ: 2 ngày 1 đêm"
                control={control}
                error={errors.schedule} 
                status={errors.schedule && "error"}
              />
            </div>

            <div className={cx("form-group")}>
              <InputField
                label="Hành trình"
                type="trip"
                name="trip"
                placeholder="Nhập hành trình. Ví dụ: Vịnh Lan Hạ - Bãi tắm Ba Trái Đào - Hang Sáng Tối"
                control={control}
                error={errors.trip} 
                status={errors.trip && "error"}
              />
            </div>
          </div>

          <div className={cx("group-input-3")}>
            <div className={cx("form-group")}>
              <InputField
                label="Slug"
                type="slug"
                name="slug"
                placeholder="Slug"
                control={control}
                error={errors.slug} 
                status={errors.slug && "error"}
              />
            </div>
            <div className={cx("form-group")}>
              <InputField
                label="Giá"
                type="default_price"
                name="default_price"
                placeholder="Nhập giá"
                control={control}
                error={errors.default_price} 
                status={errors.default_price && "error"}
              />
            </div>
            <div className={cx("form-group")}>
            <SelectField

              name="category_id"
              label="Chọn danh mục du thuyền"
              placeholder="Chọn danh mục du thuyền"
              control={control}
              error={errors.category_id}
              status={errors.category_id && "error"}
              options={cruiseCategoryOptions}
              onChange={(value) => setValue("category_id", value)}
              loading={!cruiseCategoryOptions}
            />
            </div>
            
          </div>
          <div className={cx("group-input-4")}>
            <div className={cx("form-group")}>
            <SelectField
              label="Chọn vai trò"
              name="type_product"
              placeholder="Chọn vai trò..."
              control={control}
              error={errors.type_product}
              status={errors.type_product && "error"}
              options={shipTypesOptions}
              loading={!shipTypesOptions}
              onChange={(value) => setValue("type_product", value)}
              required
            />
            </div>
            
            <div className={cx("form-group")}>
            <OptionField
                label="Chọn kích hoạt"
                type="active"
                name="active"
                placeholder="Chọn trạng thái"
                control={control}
                error={errors.active} 
                options={[
                  { value: "true", label: "Kích hoạt" },
                  { value: "false", label: "Không kích hoạt" },
                ]}
                defaultValue="true"
                required
              />
            </div>
          </div>

          <div className="group-input">
          <div className="form-group">
            <UploadField
              label="Thumbnail"
              name="thumbnail"
              control={control}
              error={errors.thumbnail}
              inputGroup={true}
              required
            />
          </div>

          <div className="form-group">
            <UploadField
              label="images"
              name="images"
              control={control}
              error={errors.images}
              inputGroup={true}
              required
            />
          </div>
          </div>
          
          <div className={cx("actions")}>
          <Button
          primary
          normal
          submit
          className={cx("align-self-end", "interceptor-loading")}
        >
          <div className={cx("label md")}>Tạo</div>
        </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create;