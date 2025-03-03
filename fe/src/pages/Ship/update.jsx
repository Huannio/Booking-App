import { useState, useParams } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { notification } from "antd";
import { InputField, OptionField } from "~/components/Input";
import axios from "~/utils/axios.config";
import Button from "~/components/Button";

import classNames from "classnames/bind";
import styles from "./Ship.module.scss";

const cx = classNames.bind(styles);

const shipSchema = yup.object().shape({
  title: yup.string().required("Tiêu đề là bắt buộc"),
  address: yup.string().required("Địa chỉ là bắt buộc"),
  shell: yup.string().required("Vật liệu thân vỏ là bắt buộc"),
  year: yup.number().required("Năm hạ thủy là bắt buộc").positive().integer(),
  cabin: yup.number().required("Số lượng cabin là bắt buộc").positive().integer(),
  admin: yup.string().required("Tên công ty điều hành là bắt buộc"),
  map_link: yup.string().url("Link bản đồ không hợp lệ").required("Link bản đồ là bắt buộc"),
  map_iframe_link: yup.string().url("Link iframe bản đồ không hợp lệ").required("Link iframe bản đồ là bắt buộc"),
  schedule: yup.string().required("Lịch trình là bắt buộc"),
  trip: yup.string().required("Hành trình là bắt buộc"),
  default_price: yup.number().required("Giá là bắt buộc").positive(),
  slug: yup.string().required("Slug là bắt buộc"),
  category: yup.string().required("Danh mục là bắt buộc"),
});

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState([]);


  const handleUpdateFeature = () => {
    navigate(`/backend/ship/feature/${id}`);
  };
  // Xử lý upload ảnh
  const handleUploadImage = async (file, isThumbnail = false) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const endpoint = isThumbnail ? "/upload/thumbnail" : "/upload/ship-images";
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (isThumbnail) {
        setThumbnail(response.data.imageUrl);
      } else {
        setImages((prev) => [...prev, response.data.imageUrl]);
      }
      notification.success({ message: "Upload ảnh thành công!" });
    } catch {
      notification.error;
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shipSchema),
  });
    
  const handleCreateShipForm = async (data) => {
    const response = await axios.post("/ships/create", data);
    if (response.statusCode === 200) {
      notification.success({
        message: response?.data?.message || "Tạo du thuyền thành công!",
      });
      reset();
      navigate("/ships");
    }
  };

  return (
    <div className={cx("action-page")}>
      <form
        method="post"
        action=""
        id="CruiseCreateForm"
        encType="multipart/form-data"
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
                inputGroup={false}
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
                inputGroup={false}
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
                inputGroup={false}
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
                inputGroup={false}
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
                inputGroup={false}
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
                inputGroup={false}
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
                inputGroup={false}
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
                inputGroup={false}
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
                inputGroup={false}
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
                inputGroup={false}
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
                inputGroup={false}
              />
            </div>
            <div className={cx("form-group")}>
              <InputField
                label="Giá"
                type="price"
                name="price"
                placeholder="Nhập giá"
                control={control}
                error={errors.price} 
                status={errors.price && "error"}
                inputGroup={false}
              />
            </div>
            <div className={cx("form-group")}>
              <OptionField
                label="Chọn danh mục du thuyền"
                type="category"
                name="category"
                placeholder="Chọn danh mục du thuyền"
                control={control}
                error={errors.category} 
                status={errors.category && "error"}
                inputGroup={false}
                options={[
                  { value: "Vịnh Lan Hạ", label: "Vịnh Lan Hạ" },
                  { value: "Vịnh Hạ Long", label: "Vịnh Hạ Long" },
                  { value: "Đảo Cát Bà", label: "Đảo Cát Bà" },
                ]}
              />
            </div>
            
          </div>
          <div className={cx("group-input-4")}>
            <div className={cx("form-group")}>
              <OptionField
                label="Loại sản phẩm"
                type="type_product"
                name="type_product"
                placeholder="Loại sản phẩm"
                control={control}
                error={errors.type_product} 
                status={errors.type_product && "error"}
                inputGroup={false}
                options={[
                  { value: "ship", label: "Ship" },
                  { value: "hotel", label: "Hotel" },
                ]}
                defaultValue="Ship"
              />
            </div>
            
            <div className={cx("form-group")}>
              <OptionField
                label="Kích hoạt"
                type="active"
                name="active"
                placeholder="Chọn kích hoạt"
                control={control}
                error={errors.active} 
                status={errors.active && "error"}
                inputGroup={false}
                options={[
                  { value: "Kích hoạt", label: "Kích hoạt" },
                  { value: "Không kích hoạt", label: "Không kích hoạt" },
                ]}
                defaultValue="Kích hoạt"
              />
            </div>
          </div>

          <div>
            <div className={cx("form-group")}>
              <label htmlFor="upload-thumbnail" className={cx("sm", "input-required")}>
                Chọn thumbnail
              </label>
              <div>
                <label htmlFor="upload-thumbnail" className={cx("flex", "align-center")}>
                  <div className={cx("flex", "align-center", "gap-16")}>
                    <input type="file" id="upload-thumbnail" name="thumbnail[]" onChange={(e) => handleUploadImage(e.target.files[0], true)} />
                    <label htmlFor="upload-thumbnail" className={cx("upload-thumb-btn", "btn", "btn-primary", "btn-normal")}>
                      Choose file
                    </label>
                    <div className={cx("preview-thumb")}>
                      {thumbnail && <img src={thumbnail} alt="Thumbnail" width="100" />}
                      <div className={cx("temp-thumb")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
                          <rect width="100" height="100" rx="5" fill="#E2E6EC" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M28.6667 37C28.6667 34.6068 30.6068 32.6667 33.0001 32.6667H67.0001C69.3933 32.6667 71.3334 34.6068 71.3334 37V63.6667C71.3334 66.0599 69.3933 68 67.0001 68H33.0001C30.6068 68 28.6667 66.0599 28.6667 63.6667V37ZM33.0001 34.6667C31.7114 34.6667 30.6667 35.7113 30.6667 37V63.6667C30.6667 64.9553 31.7114 66 33.0001 66H67.0001C68.2887 66 69.3334 64.9553 69.3334 63.6667V37C69.3334 35.7113 68.2887 34.6667 67.0001 34.6667H33.0001Z"
                            fill="#B2B9C4"
                          />
                          <ellipse cx="38.6668" cy="42" rx="4.33333" ry="4.33333" fill="#B2B9C4" />
                          <path
                            d="M34.3335 60.3333V58.357C34.3335 57.915 34.5091 57.4911 34.8217 57.1785L40.2098 51.7904C40.8389 51.1613 41.8511 51.1372 42.5094 51.7357L43.8407 52.946C44.4923 53.5383 45.4923 53.5216 46.1236 52.9077L55.8219 43.4789C56.4753 42.8436 57.5178 42.851 58.1622 43.4954L65.8453 51.1785C66.1579 51.4911 66.3335 51.915 66.3335 52.357V60.3333C66.3335 61.2538 65.5873 62 64.6668 62H36.0002C35.0797 62 34.3335 61.2538 34.3335 60.3333Z"
                            fill="#B2B9C4"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
              <div className={cx("error")}></div>
            </div>
          </div>

          <div>
            <div className={cx("form-group")}>
              <label htmlFor="upload-image" className={cx("sm", "input-required")}>
                Chọn album ảnh (tối đa 10 ảnh)
              </label>
              <div>
                <label htmlFor="upload-image" className={cx("flex", "align-center")}>
                  <div className={cx("flex", "align-center", "gap-16")}>
                    <input type="file" id="upload-image" name="images[]" multiple onChange={(e) => {
                      Array.from(e.target.files).forEach((file) => handleUploadImage(file));
                    }} />
                    <label htmlFor="upload-image" className={cx("upload-images-btn", "btn", "btn-primary", "btn-normal")}>
                      Choose file
                    </label>
                    <div className={cx("preview-image")}>
                      {images.map((img, index) => (
                        <img key={index} src={img} alt={`Ảnh ${index}`} width="100" />
                      ))}
                      <div className={cx("temp-thumb")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
                          <rect width="100" height="100" rx="5" fill="#E2E6EC" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M28.6667 37C28.6667 34.6068 30.6068 32.6667 33.0001 32.6667H67.0001C69.3933 32.6667 71.3334 34.6068 71.3334 37V63.6667C71.3334 66.0599 69.3933 68 67.0001 68H33.0001C30.6068 68 28.6667 66.0599 28.6667 63.6667V37ZM33.0001 34.6667C31.7114 34.6667 30.6667 35.7113 30.6667 37V63.6667C30.6667 64.9553 31.7114 66 33.0001 66H67.0001C68.2887 66 69.3334 64.9553 69.3334 63.6667V37C69.3334 35.7113 68.2887 34.6667 67.0001 34.6667H33.0001Z"
                            fill="#B2B9C4"
                          />
                          <ellipse cx="38.6668" cy="42" rx="4.33333" ry="4.33333" fill="#B2B9C4" />
                          <path
                            d="M34.3335 60.3333V58.357C34.3335 57.915 34.5091 57.4911 34.8217 57.1785L40.2098 51.7904C40.8389 51.1613 41.8511 51.1372 42.5094 51.7357L43.8407 52.946C44.4923 53.5383 45.4923 53.5216 46.1236 52.9077L55.8219 43.4789C56.4753 42.8436 57.5178 42.851 58.1622 43.4954L65.8453 51.1785C66.1579 51.4911 66.3335 51.915 66.3335 52.357V60.3333C66.3335 61.2538 65.5873 62 64.6668 62H36.0002C35.0797 62 34.3335 61.2538 34.3335 60.3333Z"
                            fill="#B2B9C4"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
              <div className={cx("error")}></div>
            </div>
          </div>
          <div className={cx("flex", "align-center", "gap-16", "actions")}>
            <Button type="submit" className={cx("btn", "btn-normal", "btn-primary")}>
              <div className={cx("label", "md")}>Cập nhật</div>
            </Button>

            <Button
              type="button"
              className={cx("btn", "btn-normal", "btn-outline")}
              onClick={handleUpdateFeature}
            >
              <div className={cx("label", "md")}>Cập nhật tính năng</div>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Update;