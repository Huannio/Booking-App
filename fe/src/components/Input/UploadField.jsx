import { useEffect, useState } from "react";
import { Upload } from "antd";
import { Controller } from "react-hook-form";
import Proptypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./InputField.module.scss";
const cx = classNames.bind(styles);

function UploadField({
  control,
  name,
  error,
  label,
  className = "",
  required = false,
  inputGroup = true,
  value = [],
  ...passProps
}) {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (value && Array.isArray(value)) {
      value.filter((file) => {
        if (file) {
          const newFile = {
            url: file.url,
          };
          setFileList([newFile]);
        }
      })
    }
  }, [value]);

  const onChange = ({ fileList: newFileList }, field = null) => {
    setFileList(newFileList);

    if (field) {
      const files =
        newFileList.length > 0
          ? newFileList.map((file) => file.originFileObj || file)
          : null;
      field.onChange(files); // Cập nhật giá trị vào react-hook-form
    }
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const beforeUpload = (file, field = null) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const newFile = {
        uid: file.uid,
        name: file.name,
        status: "done",
        url: reader.result,
      };
      setFileList([newFile]);
      field.onChange(file); // Cập nhật vào react-hook-form
    };
    return false; // Ngăn không cho Upload tự động
  };
  return (
    <div className={cx(className, { "input-destructive": error })}>
      <label
        htmlFor={name}
        className={inputGroup ? "input-group" : "not-input-group"}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Upload
              beforeUpload={(file) => beforeUpload(file, field)}
              listType="picture-card"
              fileList={fileList}
              onChange={(file) => onChange(file, field)}
              onPreview={onPreview}
              originFileObj={fileList}
              {...passProps}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          )}
        />
        {inputGroup && (
          <label
            htmlFor={name}
            className={cx("sm", { "input-required": required })}
          >
            {label}
          </label>
        )}
      </label>
      {error && <p className="sm error">{error.message}</p>}
    </div>
  );
}

UploadField.propTypes = {
  control: Proptypes.object,
  name: Proptypes.string,
  error: Proptypes.object,
  label: Proptypes.string,
  className: Proptypes.string,
  required: Proptypes.bool,
  inputGroup: Proptypes.bool,
  value: Proptypes.array,
};

export default UploadField;
