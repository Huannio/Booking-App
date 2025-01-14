import Proptypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./InputField.module.scss";
const cx = classNames.bind(styles);

InputField.propTypes = {
  label: Proptypes.string,
  type: Proptypes.string,
  name: Proptypes.string,
  placeholder: Proptypes.string,
  autocomplete: Proptypes.string,
  validation: Proptypes.object,
  register: Proptypes.func,
  error: Proptypes.object,
};


function InputField({
  label,
  type,
  name,
  placeholder,
  autocomplete = "off",
  validation,
  register,
  error,
}) {
  return (
    <div className={cx("inputCustom", { "input-destructive": error })}>
      <label htmlFor={name} className="input-group">
        <input
          type={type}
          placeholder={placeholder}
          autoComplete={autocomplete}
          className="p-md"
          {...register(name, validation)}
        />
        <label htmlFor={name} className="sm">
          {label}
        </label>
      </label>
      {error && <p className="sm error">{error.message}</p>}
    </div>
  );
}

export default InputField;
