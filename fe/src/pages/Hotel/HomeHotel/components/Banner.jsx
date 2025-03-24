import Button from "~/components/Button";
import classNames from "classnames/bind";
import styles from "./Banner.module.scss";
import SearchBox from "~/components/SearchBox/SearchBox";
import SearchInputBox from "~/components/SearchBox/SearchInputBox";
import { handleSearchHotelApi } from "~/api";
import SearchSelectBox from "~/components/SearchBox/SearchSelectBox";
import { Controller, useForm } from "react-hook-form";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);

function Banner({ cities }) {
  const { control, setValue, handleSubmit } = useForm();

  const handleSearchShipsForm = (data) => {
    console.log(data);
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

      <form onSubmit={handleSubmit(handleSearchShipsForm)}>
        <SearchBox
          className={cx("Home-searchBox")}
          title={"Bạn lựa chọn khách sạn nào?"}
          description={"Hàng nghìn khách sạn với mức giá tốt nhất đang chờ bạn"}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <SearchInputBox
                isDebounceEmptyCallApi={false}
                inputGroup
                name="title"
                firstIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                }
                placeholder="Tìm kiếm"
                reactHookFormChange={(e) => field.onChange(e.target.value)}
                api={handleSearchHotelApi}
                fieldDropdown={"title"}
                fieldDropdownLink={"slug"}
                to="/tim-khach-san/"
              />
            )}
          />

          <SearchSelectBox
            inputGroup
            name="categoryId"
            firstIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5.7 15C4.03377 15.6353 3 16.5205 3 17.4997C3 19.4329 7.02944 21 12 21C16.9706 21 21 19.4329 21 17.4997C21 16.5205 19.9662 15.6353 18.3 15M12 9H12.01M18 9C18 13.0637 13.5 15 12 18C10.5 15 6 13.0637 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            }
            lastIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9L12 15L18 9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            }
            items={cities}
            fieldDropdown="name"
            defaultValue="Tất cả địa điểm"
            fieldSelectItem={"id"}
            onSelectItem={(value) => {
              setValue("categoryId", value);
            }}
          />

          <SearchSelectBox
            inputGroup
            name="price"
            firstIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15 10V9.91667C15 8.85812 14.1419 8 13.0833 8H11C9.89543 8 9 8.89543 9 10C9 11.1046 9.89543 12 11 12H13C14.1046 12 15 12.8954 15 14C15 15.1046 14.1046 16 13 16H10.9583C9.87678 16 9 15.1232 9 14.0417V14M12 17.5V6.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#101828"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            }
            lastIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9L12 15L18 9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            }
            items={[
              {
                label: "Từ 1 đến 3 triệu",
                queryObject: {
                  greater_defaultPrice: 1000000,
                  lower_defaultPrice: 3000000,
                },
              },
              {
                label: "Từ 3 đến 6 triệu",
                queryObject: {
                  greater_defaultPrice: 3000000,
                  lower_defaultPrice: 6000000,
                },
              },
              {
                label: "Trên 6 triệu",
                queryObject: { greater_defaultPrice: 6000000 },
              },
            ]}
            fieldDropdown="label"
            fieldSelectItem="queryObject"
            defaultValue="Tất cả mức giá"
            onSelectItem={(value) => {
              setValue("price", value);
            }}
          />

          <Button submit color normal className="SearchBox-submit-btn">
            <div className="label md">Tìm kiếm</div>
          </Button>
        </SearchBox>
      </form>
    </div>
  );
}

Banner.propTypes = {
  cities: PropTypes.array,
};

export default Banner;
