import * as yup from "yup";

const emailYup = yup
  .string()
  .email("Vui lòng nhập một địa chỉ email hợp lệ")
  .required("Vui lòng nhập trường này");

export const userSchema = yup.object({
  name: yup
    .string()
    .transform((value) => value.trim())
    .required("Vui lòng nhập trường này"),
  email: emailYup,
  role_id: yup.string().required("Vui lòng chọn trường này"),
});

export const loginSchema = yup.object({
  email: emailYup,
  password: yup.string().required("Vui lòng nhập trường này"),
});
