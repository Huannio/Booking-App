import Proptypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./InputField.module.scss";
import { Input } from "antd";
import { Controller } from "react-hook-form";
const cx = classNames.bind(styles);

ListField.propTypes = {
  label: Proptypes.string,
  type: Proptypes.string,
  name: Proptypes.string,
  placeholder: Proptypes.string,
  autocomplete: Proptypes.string,
  register: Proptypes.func,
  error: Proptypes.object,
  className: Proptypes.string,
  required: Proptypes.bool,
  control: Proptypes.object,
  inputGroup: Proptypes.bool,
};

function ListField({
  label,
  type,
  name,
  placeholder,
  autocomplete = "off",
  control,
  error,
  className = "",
  required = false,
  inputGroup = true,
  ...passProps
}) {
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
            <Input
              variant="borderless"
              type={type}
              placeholder={placeholder}
              autoComplete={autocomplete}
              className="p-md"
              {...passProps}
              {...field}
            />
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

export default ListField;
