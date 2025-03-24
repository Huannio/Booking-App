import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./InputField.module.scss";
import { useEffect, useState } from "react";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const cx = classNames.bind(styles);

function UploadField({
  label,
  name,
  control,
  error,
  className,
  multiple = false,
  accept = "image/*",
  variant = "default", // 'default' | 'thumbnail'
  ...passProps
}) {
  const [previews, setPreviews] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (control._defaultValues[name]) {
      const existingImages = Array.isArray(control._defaultValues[name])
        ? control._defaultValues[name]
        : [control._defaultValues[name]];
      setPreviews(existingImages);
    }
  }, [control._defaultValues, name]);

  const handleChangeImage = (e, onChange) => {
    const selectedFiles = Array.from(e.target.files);
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));

    setPreviews([...previews, ...newPreviews]);
    onChange([...previews, ...selectedFiles]);
  };

  const handleRemoveImage = (index, onChange) => {
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);

    if (multiple) {
      onChange(newPreviews.length > 0 ? newPreviews : null);
    } else {
      onChange(null);
    }
  };

  // Style mapping by variant
  const styleMap = {
    containerList:
      variant === "thumbnail" ? "pre-container-list" : "preview-container-list",
    container: variant === "thumbnail" ? "pre-container" : "preview-container",
    image: variant === "thumbnail" ? "pre" : "preview",
    overlay: variant === "thumbnail" ? "pre-overlay" : "overlay",
  };

  return (
    <>
      <div
        className={cx(
          className,
          { "input-destructive": error },
          "upload-select"
        )}
      >
        <label
          className="sm input-required"
          style={{ position: "absolute", top: "-12%", left: "0" }}
        >
          {label}
        </label>

        <Controller
          name={name}
          control={control}
          rules={{ required: "Vui lòng chọn ảnh" }}
          render={({ field: { onChange } }) => (
            <>
              {!(!multiple && previews.length > 0) && (
                <label htmlFor={name} className="not-input-group">
                  <span className={cx("upload", { "input-error": error })}>
                    + Upload
                  </span>
                </label>
              )}

              <input
                id={name}
                style={{ display: "none" }}
                accept={accept}
                type="file"
                multiple={multiple}
                className="p-md"
                {...passProps}
                onChange={(e) => handleChangeImage(e, onChange)}
              />

              {previews.length > 0 && (
                <div className={cx(styleMap.containerList)}>
                  {previews.map((src, index) => (
                    <div className={cx(styleMap.container)} key={index}>
                      <img
                        src={src}
                        alt={`Preview ${index}`}
                        className={cx(styleMap.image)}
                      />
                      <div className={cx(styleMap.overlay)}>
                        <EyeOutlined
                          onClick={() => {
                            setModalVisible(true);
                            setFullscreenImage(src);
                          }}
                          style={{
                            fontSize: variant === "thumbnail" ? "20px" : "16px",
                            color: "white",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index, onChange)}
                          className={cx("remove-image-btn")}
                        >
                          <DeleteOutlined
                            style={{
                              fontSize:
                                variant === "thumbnail" ? "20px" : "16px",
                              color: "white",
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {error && <p className="sm error">{error.message}</p>}
            </>
          )}
        />
      </div>

      <Modal
        open={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        <img
          src={fullscreenImage}
          alt="Fullscreen"
          style={{ width: "100%", height: "auto" }}
        />
      </Modal>
    </>
  );
}

UploadField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  error: PropTypes.object,
  className: PropTypes.string,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  variant: PropTypes.oneOf(["default", "thumbnail"]),
};

export default UploadField;
