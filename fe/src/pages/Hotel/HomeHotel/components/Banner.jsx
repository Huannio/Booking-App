import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import styles from "./Banner.module.scss";
import { HotelSearchBox } from "~/components/SearchBox";
const cx = classNames.bind(styles);

function Banner({ cities }) {
  const navigate = useNavigate();
  const { control, setValue, handleSubmit } = useForm();

  const handleSearchForm = (data) => {
    const params = new URLSearchParams();

    if (data?.title) {
      params.append("title", data?.title);
    }

    if (data?.cityId) {
      params.append("cityId", data?.cityId);
    }

    if (data?.price?.greater_defaultPrice) {
      params.append("greater_defaultPrice", data?.price?.greater_defaultPrice);
    }

    if (data?.price?.lower_defaultPrice) {
      params.append("lower_defaultPrice", data?.price?.lower_defaultPrice);
    }

    navigate(`/tim-khach-san?${params.toString()}`);
  };

  return (
    <div className={cx("Home-banner")}>
      <video
        className={cx("Home-bg-video")}
        src="https://res.cloudinary.com/dhnp8ymxv/video/upload/v1732194247/MixivivuHotel_uckfu2.mp4"
        autoPlay
        muted
        loop
      />

      <HotelSearchBox
        cities={cities}
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
  cities: PropTypes.array,
};

export default Banner;
