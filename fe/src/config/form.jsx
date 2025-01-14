const regrex = {
  isPhone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  isEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

const formErrorMessages = {
  required: "Vui lòng nhập trường này",
  isPhone: "Vui lòng nhập một số điện thoại hợp lệ",
  isEmail: "Vui lòng nhập một địa chỉ email hợp lệ",
};

const emailValidation = {
  required: formErrorMessages.required,
  pattern: {
    value: regrex.isEmail,
    message: formErrorMessages.isEmail,
  },
};

const phoneValidation = {
  required: formErrorMessages.required,
  pattern: {
    value: regrex.isPhone,
    message: formErrorMessages.isPhone,
  },
};

const passwordValidation = {
  required: formErrorMessages.required,
};

export {
  regrex,
  formErrorMessages,
  emailValidation,
  phoneValidation,
  passwordValidation,
};
