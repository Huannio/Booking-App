import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { Select } from "antd";
import classNames from "classnames/bind";
import styles from "./InputField.module.scss";
const cx = classNames.bind(styles);

function OptionField({
  name,
  label,
  placeholder,
  control,
  error,
  options,
  loading,
  onChange,
  required = false,
  status,
  defaultValue,
}) {
  return (
    <>
      <label htmlFor={name} className="select-group">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Select
              placeholder={placeholder}
              loading={loading}
              onChange={onChange}
              {...field}
              status={status}
            >
              {options.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          )}
        />
        <label
          htmlFor={name}
          className={cx("sm", { "input-required": required })}
        >
          {label}
        </label>
      </label>
      {error && <p className="sm error">{error.message}</p>}
    </>
  );
}

OptionField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  control: PropTypes.object,
  error: PropTypes.object,
  options: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  status: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default OptionField;
