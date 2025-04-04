import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames/bind';
import styles from './DatePicker.module.scss';

const cx = classNames.bind(styles);

function CustomDatePicker({
  name,
  selected,
  onChange,
  placeholder,
  minDate,
  disabled,
  className,
  inputGroup,
  firstIcon,
  lastIcon,
  ...props
}) {
  return (
    <div className={cx('CustomDatePicker', className, { 'input-group': inputGroup })}>
      {inputGroup && (
        <label htmlFor={name} className={cx('Input-input-group')}>
          {firstIcon && <span className={cx('input-icon')}>{firstIcon}</span>}
          
          <DatePicker
            id={name}
            selected={selected}
            onChange={onChange}
            placeholderText={placeholder}
            minDate={minDate}
            disabled={disabled}
            className={cx('p-md')}
            dateFormat="dd/MM/yyyy"
            {...props}
          />
          
          {lastIcon && <span className={cx('input-icon')}>{lastIcon}</span>}
          
          {inputGroup && <label htmlFor={name} className={cx('sm', 'label-input')}>{placeholder}</label>}
        </label>
      )}
      
      {!inputGroup && (
        <DatePicker
          id={name}
          selected={selected}
          onChange={onChange}
          placeholderText={placeholder}
          minDate={minDate}
          disabled={disabled}
          className={cx('p-md')}
          dateFormat="dd/MM/yyyy"
          {...props}
        />
      )}
    </div>
  );
}

CustomDatePicker.propTypes = {
  name: PropTypes.string,
  selected: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  inputGroup: PropTypes.bool,
  firstIcon: PropTypes.node,
  lastIcon: PropTypes.node,
};

CustomDatePicker.defaultProps = {
  inputGroup: true,
  disabled: false,
};

export default CustomDatePicker;