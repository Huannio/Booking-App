import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);

const schema = yup.object().shape({
  full_name: yup.string().required("Bạn phải nhập họ và tên"),
  email: yup.string().email("Email không hợp lệ").required("Bạn phải nhập email"),
  phone_number: yup
    .string()
    .required("Bạn phải nhập số điện thoại"),
  additional_info: yup.string().required("Bạn cần nhập nội dung yêu cầu"),
});

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Gọi API hoặc xử lý dữ liệu tại đây
  };

  return (
    <div className={cx("Contact-contact")}>
      <iframe
        title="contact"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d232.78000083101227!2d105.8167993!3d21.0134711!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab05255ac095%3A0xac1b475116786bdb!2sMixiVivu!5e0!3m2!1sen!2s!4v1699933131083!5m2!1sen!2s"
        id="gmap_canvas"
        width="100%"
        height="720"
        style={{ border: "0px", borderRadius: "24px" }}
      ></iframe>

      <div className={cx("Card-card", "Contact-contact-card")}>
        <div className={cx("flex flex-col gap-16 text-center align-center w-full")}>
          <h4>Khám phá Hạ Long thông qua Du thuyền</h4>
          <p className={cx("lg")}>
            Khám phá Hạ Long qua Du thuyền cùng Mixivivu - Hãy liên hệ ngay để trải nghiệm hành trình tuyệt vời!
          </p>
        </div>

        {/* 🛠️ Form sử dụng `react-hook-form` */}
        <form onSubmit={handleSubmit(onSubmit)} className={cx("w-full")} id="Contact-form">
          <div className={cx("flex flex-col gap-24 w-full")}>
            <div className={cx("form-group")}>
              <div>
                <label htmlFor="full_name" className={cx("input-group")}>
                  <input {...register("full_name")} className={cx("p-md")} placeholder="Nhập họ và tên" />
                  <label htmlFor="full_name" className={cx("sm", "input-required")}>Họ và tên</label>
                </label>
              </div>
              <div className={cx("error")}>{errors.full_name?.message}</div>
            </div>

            <div className={cx("grid grid-cols-2 gap-24", "Contact-group-input")}>
              <div className={cx("form-group")}>
                <div>
                  <label htmlFor="email" className={cx("input-group")}>
                    <input {...register("email")} className={cx("p-md")} placeholder="Nhập email" />
                    <label htmlFor="email" className={cx("sm", "input-required")}>Email</label>
                  </label>
                </div>
                <div className={cx("error")}>{errors.email?.message}</div>
              </div>

              <div className={cx("form-group")}>
                <div>
                  <label htmlFor="phone_number" className={cx("input-group")}>
                    <input {...register("phone_number")} className={cx("p-md")} placeholder="Nhập số điện thoại" />
                    <label htmlFor="phone_number" className={cx("sm", "input-required")}>Số điện thoại</label>
                  </label>
                </div>
                <div className={cx("error")}>{errors.phone_number?.message}</div>
              </div>
            </div>

            <div className={cx("form-group")}>
              <div>
                <label htmlFor="additional_info" className={cx("input-group")}>
                  <textarea {...register("additional_info")} className={cx("p-md")} placeholder="Nhập yêu cầu của bạn"></textarea>
                  <label htmlFor="additional_info" className={cx("sm", "input-required")}>Nội dung</label>
                </label>
              </div>
              <div className={cx("error")}>{errors.additional_info?.message}</div>
            </div>

            <Button type="submit" className={cx("btn-btn", "btn-normal", "btn-color", "btn-w-full", "btn-primary")}>
              <div className={cx("label md")}>Liên hệ với Mixivivu</div>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
