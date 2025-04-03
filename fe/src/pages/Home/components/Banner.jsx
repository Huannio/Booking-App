import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "./Banner.module.scss";
import { CruiseSearchBox } from "~/components/SearchBox";
const cx = classNames.bind(styles);

function Banner({ cruiseCategory }) {
  const navigate = useNavigate();
  const { control, setValue, handleSubmit } = useForm();

  const handleSearchForm = (data) => {
    const params = new URLSearchParams();

    if (data?.title) {
      params.append("title", data?.title);
    }

    if (data?.categoryId) {
      params.append("categoryId", data?.categoryId);
    }

    if (data?.price?.greater_defaultPrice) {
      params.append("greater_defaultPrice", data?.price?.greater_defaultPrice);
    }

    if (data?.price?.lower_defaultPrice) {
      params.append("lower_defaultPrice", data?.price?.lower_defaultPrice);
    }

    navigate(`/tim-du-thuyen?${params.toString()}`);
  };

  return (
    <div className={cx("Home-banner")}>
      <video
        className={cx("Home-bg-video")}
        src="https://res.cloudinary.com/dhnp8ymxv/video/upload/v1731849290/Mixivivuduthuyen_cnlkmw.mp4"
        autoPlay
        muted
        loop
      />

      <CruiseSearchBox
        cruiseCategory={cruiseCategory}
        handleSubmit={handleSubmit}
        handleSearchForm={handleSearchForm}
        control={control}
        setValue={setValue}
        className={cx("Home-searchBox")}
      />
    </div>
  );
}

Banner.propTypes = {
  cruiseCategory: PropTypes.array,
};

export default Banner;
