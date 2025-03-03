import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import axios from "~/utils/axios.config";
import { LoadingContext } from "~/components/Loading/Loading";
import Button from "~/components/Button";

import classNames from "classnames/bind";
import styles from "./Ship.module.scss";

const cx = classNames.bind(styles);

function Create() {
  const navigate = useNavigate();
  const { setGlobalLoading } = useContext(LoadingContext);
  const [shipTypes, setShipTypes] = useState([]); // Danh sách loại tàu
  const [selectedShipType, setSelectedShipType] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isDropdownActiveOpen, setIsDropdownActiveOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownCategoryOpen, setIsDropdownCategoryOpen] = useState(false);

  const handleSelectActive = (value) => {
    setIsActive(value === "Kích hoạt");
    setIsDropdownActiveOpen(false);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setIsDropdownCategoryOpen(false);
  };

  const handleSelectShipType = (type) => {
    setSelectedShipType(type.name);
  };

  // Fetch danh sách loại tàu
  const getShipTypes = async () => {
    setGlobalLoading(true);
    try {
      const { data } = await axios.get("/ships-type");
      setShipTypes(data || []);
    } catch {
      notification.error;
    } finally {
      setGlobalLoading(false);
    }
  };

  useEffect(() => {
    getShipTypes();
  }, []);

  // Xử lý upload ảnh
  const handleUploadImage = async (file, isThumbnail = false) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const endpoint = isThumbnail ? "/api/upload-thumbnail" : "/api/upload-ship-images";
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

  // Xử lý submit form
  const handleCreateShipForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("ship_type", selectedShipType);
    formData.append("active", isActive);
    formData.append("category", selectedCategory);

    try {
      const response = await axios.post("/ships/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        notification.success({ message: response?.data?.message || "Tạo du thuyền thành công!" });
        navigate("/ships");
      }
    } catch {
      notification.error;
    }
  };

  return (
    <div className={cx("action-page")}>
      <form
        method="post"
        action=""
        id="CruiseCreateForm"
        encType="multipart/form-data"
        onSubmit={handleCreateShipForm}
      >
        <div className={cx("modal")}>
          <h6>Tạo mới du thuyền</h6>
          <div className={cx("divider")} style={{ borderBottom: "1px solid var(--gray-200, #eaecf0)" }}></div>

          {/* Nhóm thông tin cơ bản */}
          <div className={cx("group-input")}>
            <div className={cx("form-group")}>
              <div>
                <label htmlFor="title" className={cx("input-group")}>
                  <input
                    id="title"
                    className={cx("p-md")}
                    placeholder="Nhập tiêu đề"
                    name="title"
                    autoComplete="off"
                  />
                  <label htmlFor="title" className={cx("sm", "input-required")}>
                    Tiêu đề
                  </label>
                </label>
              </div>
              <div className={cx("error")}></div>
            </div>

            <div className={cx("form-group")}>
              <div>
                <label htmlFor="address" className={cx("input-group")}>
                  <input
                    id="address"
                    className={cx("p-md")}
                    placeholder="Nhập địa chỉ"
                    name="address"
                    autoComplete="off"
                  />
                  <label htmlFor="address" className={cx("sm", "input-required")}>
                    Địa chỉ
                  </label>
                </label>
              </div>
              <div className={cx("error")}></div>
            </div>
          </div>

          {/* Nhóm thông tin kỹ thuật */}
          <div className={cx("group-input-4")}>
            <div className={cx("form-group")}>
              <div>
                <label htmlFor="shell" className={cx("input-group")}>
                  <input
                    id="shell"
                    className={cx("p-md")}
                    placeholder="Nhập vật liệu thân vỏ"
                    name="shell"
                    autoComplete="off"
                  />
                  <label htmlFor="title" className={cx("sm", "input-required")}>
                    Thân vỏ
                  </label>
                </label>
              </div>
              <div className={cx("error")}></div>
            </div>

            <div className={cx("form-group")}>
              <div>
                <label htmlFor="year" className={cx("input-group")}>
                  <input
                    id="year"
                    className={cx("p-md")}
                    placeholder="Nhập năm hạ thủy"
                    name="year"
                    autoComplete="off"
                  />
                  <label htmlFor="title" className={cx("sm", "input-required")}>
                    Năm hạ thủy
                  </label>
                </label>
              </div>
              <div className={cx("error")}></div>
            </div>

            <div className={cx("form-group")}>
              <div>
                <label htmlFor="cabin" className={cx("input-group")}>
                  <input
                    id="cabin"
                    className={cx("p-md")}
                    placeholder="Nhập số lượng cabin"
                    name="cabin"
                    autoComplete="off"
                  />
                  <label htmlFor="title" className={cx("sm", "input-required")}>
                  Cabin
                  </label>
                </label>
              </div>
              <div className={cx("error")}></div>
            </div>

            <div className={cx("form-group")}>
              <div>
                <label htmlFor="admin" className={cx("input-group")}>
                  <input
                    id="admin"
                    className={cx("p-md")}
                    placeholder="Nhập tên công ty điều hành"
                    name="admin"
                    autoComplete="off"
                  />
                 <label htmlFor="title" className={cx("sm", "input-required")}>
                    Tên công ty điều hànhhành
                  </label>
                </label>
              </div>
              <div className={cx("error")}></div>
            </div>
          </div>

          {/* Nhóm thông tin bản đồ */}
          <div className={cx("group-input")}>
            <div className={cx("form-group")}>
              <div>
                <label htmlFor="map_link" className={cx("input-group")}>
                  <input
                    id="map_link"
                    className={cx("p-md")}
                    placeholder="Nhập link bản đồ google map"
                    name="map_link"
                    autoComplete="off"
                    type="text"
                  />
                  <label htmlFor="title" className={cx("sm", "input-required")}>
                    Map LinkLink
                  </label>
                </label>
              </div>
              <div className={cx("error")}></div>
            </div>

            <div className={cx("form-group")}>
              <div>
                <label htmlFor="map_iframe_link" className={cx("input-group")}>
                  <input
                    id="map_iframe_link"
                    className={cx("p-md")}
                    placeholder="Nhập link nhúng bản đồ google map cho thẻ iframe"
                    name="map_iframe_link"
                    autoComplete="off"
                  />
                 <label htmlFor="title" className={cx("sm", "input-required")}>
                  Map Iframe Link
                  </label>
                </label>
              </div>
              <div className={cx("error")}></div>
            </div>
          </div>

          {/* Nhóm thông tin lịch trình và giá */}
          <div className={cx("group-input-3")}>
            <div className={cx("form-group")}>
              <div>
                <label htmlFor="schedule" className={cx("input-group")}>
                  <input
                    id="schedule"
                    className={cx("p-md")}
                    placeholder="Nhập lịch trình. Ví dụ: 2 ngày 1 đêm."
                    name="schedule"
                    autoComplete="off"
                  />
                  <label htmlFor="title" className={cx("sm", "input-required")}>
                      Lịch trình
                  </label>
                </label>
              </div>
              <div className={cx("error")}></div>
            </div>

            <div className={cx("form-group")}>
              <div>
                <label htmlFor="trip" className={cx("input-group")}>
                  <input
                    id="trip"
                    className={cx("p-md")}
                    placeholder="Nhập hành trình. Ví dụ: Vịnh Lan Hạ - Bãi tắm Ba Trái Đào - Hang Sáng Tối"
                    name="trip"
                    autoComplete="off"
                  />
                  <label htmlFor="title" className={cx("sm", "input-required")}>
                      Hành trình
                  </label>
                </label>
              </div>
              <div className={cx("error")}></div>
            </div>

            <div className={cx("form-group")}>
              <div>
                <label htmlFor="default_price" className={cx("input-group")}>
                  <input
                    id="default_price"
                    className={cx("p-md")}
                    placeholder="Nhập giá"
                    name="default_price"
                    autoComplete="off"
                  />
                  <label htmlFor="title" className={cx("sm", "input-required")}>
                      Giá
                  </label>
                </label>
              </div>
              <div className={cx("error")}></div>
            </div>
          </div>

          {/* Nhóm thông tin bổ sung */}
          <div className={cx("group-input-4")}>
            <div className={cx("form-group")}>
              <div>
                <label htmlFor="slug" className={cx("input-group")}>
                  <input
                    id="slug"
                    className={cx("p-md")}
                    placeholder="Slug"
                    name="slug"
                    autoComplete="off"
                    type="text"
                  />
                  <label htmlFor="title" className={cx("sm", "input-required")}>
                      Slug
                  </label>
                </label>
              </div>
              <div className={cx("error")}></div>
            </div>

            <div className={cx("form-group")}>
              <div className={cx("select-input")}>
                <label htmlFor="ship_type" className={cx("input-group")}>
                  <input
                    id="ship_type"
                    className={cx("p-md")}
                    placeholder="Chọn loại tàu"
                    name="ship_type"
                    autoComplete="off"
                    value={selectedShipType}
                    readOnly
                  />
                  <label htmlFor="title" className={cx("sm", "input-required")}>
                    Loại sản phẩm
                  </label>
                </label>
                <div className={cx("dropdown")}>
                  {shipTypes.map((type) => (
                    <div
                      key={type.id}
                      className={cx("dropdown-item")}
                      onClick={() => handleSelectShipType(type)}
                    >
                      {type.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className={cx("error")}></div>
            </div>

            <div className={cx("form-group")}>
              <div className={cx("select-input")}>
                <label htmlFor="active" className={cx("input-group")}>
                  <input
                    id="active"
                    className={cx("p-md")}
                    placeholder="Chọn kích hoạt"
                    name="active"
                    autoComplete="off"
                    value={isActive ? "Kích hoạt" : "Không kích hoạt"}
                    readOnly
                    onClick={() => setIsDropdownActiveOpen(!isDropdownActiveOpen)}
                  />
                  <label htmlFor="title" className={cx("sm", "input-required")}>
                    Kích hoạt
                  </label>
                </label>
                {isDropdownActiveOpen && (
                  <div className={cx("dropdown")}>
                    <div
                      className={cx("dropdown-item")}
                      onClick={() => handleSelectActive("Kích hoạt")}
                    >
                      Kích hoạt
                    </div>
                    <div
                      className={cx("dropdown-item")}
                      onClick={() => handleSelectActive("Không kích hoạt")}
                    >
                      Không kích hoạt
                    </div>
                  </div>
                )}
              </div>
              <div className={cx("error")}></div>
            </div>

            <div className={cx("form-group")}>
              <div className={cx("select-input")}>
                <label htmlFor="category" className={cx("input-group")}>
                  <input
                    id="category"
                    className={cx("p-md")}
                    placeholder="Chọn danh mục du thuyền"
                    name="category"
                    autoComplete="off"
                    value={selectedCategory || "Chọn danh mục"}
                    readOnly
                    onClick={() => setIsDropdownCategoryOpen(!isDropdownCategoryOpen)}
                  />
                  <label htmlFor="title" className={cx("sm", "input-required")}>
                    Chọn danh mục du thuyền
                  </label>
                </label>
                {isDropdownCategoryOpen && (
                  <div className={cx("dropdown")}>
                    <div
                      className={cx("dropdown-item")}
                      onClick={() => handleSelectCategory("Vịnh Lan Hạ")}
                    >
                      Vịnh Lan Hạ
                    </div>
                    <div
                      className={cx("dropdown-item")}
                      onClick={() => handleSelectCategory("Vịnh Hạ Long")}
                    >
                      Vịnh Hạ Long
                    </div>
                  </div>
                )}
              </div>
              <div className={cx("error")}></div>
            </div>
          </div>

          {/* Nhóm thông tin hình ảnh */}
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
          <div className={cx("actions")}>
            <Button type="submit" className={cx("btn", "btn-normal", "btn-primary")}>
              <div className={cx("label", "md")}>Tạo</div>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create;