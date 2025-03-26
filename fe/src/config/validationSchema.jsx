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
  user_catalogues_id: yup.string().required("Vui lòng chọn trường này"),
});

export const usersCataloguesSchema = yup.object({
  name: yup
    .string()
    .transform((value) => value.trim())
    .required("Vui lòng nhập trường này"),
  description: yup
    .string()
    .transform((value) => value.trim())
    .required("Vui lòng nhập trường này"),
});

export const loginSchema = yup.object({
  email: emailYup,
  password: yup.string().required("Vui lòng nhập trường này"),
});

export const blogSchema = yup.object({
  title: yup.string().required("Vui lòng nhập trường này"),
  short_desc: yup.string().required("Vui lòng nhập trường này"),
  type_id: yup.string().required("Vui lòng chọn trường này"),
  thumbnail: yup.mixed().required("Vui lòng chọn ảnh"),
});

export const blogDetailSchema = yup.object().shape({
  contentBlocks: yup.array().of(
    yup.lazy((value) => {
      switch (value?.type) {
        case "Paragraph":
          return yup.object().shape({
            type: yup.string().required(),
            content: yup
              .string()
              .trim()
              .required("Paragraph không được để trống"),
          });
        case "List":
          return yup.object().shape({
            type: yup.string().required(),
            content: yup.string().required("List không được để trống"),
          });
        case "Image":
          return yup.object().shape({
            type: yup.string().required(),
            file: yup.mixed().required("Vui lòng chọn ảnh"),
          });
        default:
          return yup.object();
      }
    })
  ),
});

export const cruiseSchema = yup.object().shape({
  title: yup.string().required("Vui lòng nhập trường này"),
  address: yup.string().required("Vui lòng nhập trường này"),
  admin: yup.string().required("Vui lòng nhập trường này"),
  default_price: yup.number().required("Vui lòng nhập trường này"),
  schedule: yup.string().required("Vui lòng nhập trường này"),
  trip: yup.string().required("Vui lòng nhập trường này"),
  thumbnail: yup.mixed().required("Vui lòng chọn ảnh"),
  images: yup.array().required("Vui lòng chọn ảnh"),
  shell: yup.string().required("Vui lòng chọn trường này"),
  cruise_category: yup.string().required("Vui lòng chọn trường này"),
  cabin: yup.number().required("Vui lòng nhập trường này"),
  year: yup.number().required("Vui lòng nhập trường này"),
});

export const shipDetailSchema = yup.object().shape({
  contentBlocks: yup.array().of(
    yup.lazy((value) => {
      switch (value?.type) {
        case "Header":
          return yup.object().shape({
            type: yup.string().required(),
            content: yup.string().required("Header không được để trống"),
          });
        case "Paragraph":
          return yup.object().shape({
            type: yup.string().required(),
            content: yup
              .string()
              .trim()
              .required("Paragraph không được để trống"),
          });
        case "Image":
          return yup.object().shape({
            type: yup.string().required(),
            file: yup.mixed().required("Vui lòng chọn ảnh"),
          });
        default:
          return yup.object();
      }
    })
  ),
});

export const featureSchema = yup.object().shape({
  text: yup.string().required("Vui lòng nhập trường này"),
  type: yup.string().required("Vui lòng chọn trường này"),
  icon: yup.mixed().required("Vui lòng chọn ảnh"),
});
export const permissionSchema = yup.object({
  name: yup.string().required("Vui lòng nhập trường này"),
  canonical: yup.string().required("Vui lòng nhập trường này"),
});

// hotel schema
export const hotelSchema = yup.object().shape({
  title: yup.string().required("Vui lòng nhập trường này"),
  address: yup.string().required("Vui lòng nhập trường này"),
  admin: yup.string().required("Vui lòng nhập trường này"),
  default_price: yup.number().required("Vui lòng nhập trường này"),
  thumbnail: yup.mixed().required("Vui lòng chọn ảnh"),
  images: yup.array().required("Vui lòng chọn ảnh"),
  cities: yup.number().required("Vui lòng chọn trường này"),
});
