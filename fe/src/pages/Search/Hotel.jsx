import { useForm } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import { Skeleton } from "antd";
import { useSearchParams } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import Button from "~/components/Button";
import { SearchSelectBox, HotelSearchBox } from "~/components/SearchBox";
import {
  handleSearchHotelApi,
  handleGetCityApi,
  handleGetAllFeaturesApi,
} from "~/api";
import ImageWrapper from "~/components/ImageWrapper";
import ProductCard from "~/components/Card/ProductCard";
import Badge from "~/components/Badge/Badge";
import Collapse from "~/components/Collapse/Collapse";
import { formatMoney } from "~/utils/formatters";
import Pagination from "~/components/Pagination";
import Sidebar from "./components/Sidebar";
import List from "./components/List";

const cx = classNames.bind(styles);

const starOrder = [
  { id: 3, name: "3 sao", value: "3" },
  { id: 4, name: "4 sao", value: "4" },
  { id: 5, name: "5 sao", value: "5" },
];

function Hotel() {
  let [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);

  const [sideBarVisible, setSidebarVisible] = useState(false);

  const [checkedFeaturesList, setCheckedFeaturesList] = useState([]);
  const [checkedStarList, setCheckedStarList] = useState([]);

  const [features, setFeatures] = useState([]);
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);

  const [records, setRecords] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [orderBy, setOrderBy] = useState("id");
  const [orderType, setOrderType] = useState("ASC");

  const { control, setValue, handleSubmit } = useForm();

  const getCities = async () => {
    const res = await handleGetCityApi();
    setCities(res.data);
  };

  const getFeatures = async () => {
    const res = await handleGetAllFeaturesApi();
    setFeatures(res.features);
  };

  const handleGetData = useCallback(
    async (
      title,
      cityId,
      greaterDefaultPrice,
      lowerDefaultPrice,
      page,
      limit,
      featureList,
      starList,
      orderBy,
      orderType
    ) => {
      setLoading(true);
      const res = await handleSearchHotelApi(
        title,
        cityId,
        greaterDefaultPrice,
        lowerDefaultPrice,
        page,
        limit,
        featureList,
        starList,
        orderBy,
        orderType
      );
      setData(res.data);
      setTotalPages(res.totalPages);
      setTotalRecords(res.total);
      setRecords(res.records);
      setLoading(false);
      setCurrentPage(0); // reset current page to 0
    },
    []
  );

  const [title, setTitle] = useState(searchParams.get("title"));
  const [cityId, setCityId] = useState(searchParams.get("cityId"));
  const [greaterDefaultPrice, setGreaterDefaultPrice] = useState(
    searchParams.get("greater_defaultPrice")
  );
  const [lowerDefaultPrice, setLowerDefaultPrice] = useState(
    searchParams.get("lower_defaultPrice")
  );

  const handleSearchForm = (data) => {
    console.log(data);

    setTitle(data?.title);
    setCityId(data?.cityId);
    setGreaterDefaultPrice(data?.price?.greater_defaultPrice);
    setLowerDefaultPrice(data?.price?.lower_defaultPrice);
    handleGetData(
      data?.title,
      data?.cityId,
      data?.price?.greater_defaultPrice,
      data?.price?.lower_defaultPrice,
      0,
      5,
      checkedFeaturesList,
      checkedStarList,
      orderBy,
      orderType
    );
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
    handleGetData(
      title,
      cityId,
      greaterDefaultPrice,
      lowerDefaultPrice,
      e.selected,
      5,
      checkedFeaturesList,
      checkedStarList,
      orderBy,
      orderType
    );
    listRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const listRef = useRef(null);

  useEffect(() => {
    getCities();
    getFeatures();
  }, []);

  useEffect(() => {
    handleGetData(
      title,
      cityId,
      greaterDefaultPrice,
      lowerDefaultPrice,
      currentPage,
      5,
      checkedFeaturesList,
      checkedStarList,
      orderBy,
      orderType
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedFeaturesList, checkedStarList]);

  const handleSelect = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      if (starOrder.some((star) => star.value === value)) {
        setCheckedStarList([...checkedStarList, value]);
      } else {
        setCheckedFeaturesList([...checkedFeaturesList, value]);
      }
    } else {
      setCheckedFeaturesList(
        checkedFeaturesList.filter((feature) => feature !== value)
      );
      setCheckedStarList(checkedStarList.filter((star) => star !== value));
    }
  };

  const handleReset = () => {
    setCheckedFeaturesList([]);
    setCheckedStarList([]);
  };

  return (
    <div className="section-bg">
      <div
        className={cx(
          "SearchPageDetail-searchPage",
          "flex flex-col gap-80 container"
        )}
      >
        {/* SearchBox Mobile & Tablet */}
        <div className={cx("fresnel-container", "fresnel-lessThan-md")}>
          <div className={cx("Card", "SearchPageDetail-collapse")}>
            <Collapse
              className={cx("SearchPageDetail-customHeader")}
              headerElement={(isOpen) => (
                <div className={cx("SearchPageDetail-collapse-header")}>
                  <div
                    className="subheading sm flex-grow"
                    style={{ color: "var(--gray-800)" }}
                  >
                    Tìm kiếm
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d={isOpen ? "M6 12L18 12" : "M6 9L12 15L18 9"}
                      stroke="#98A2B3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              )}
            >
              <HotelSearchBox
                className={cx("SearchPageDetail-searchBox-mb")}
                cities={cities}
                control={control}
                setValue={setValue}
                handleSubmit={handleSubmit}
                handleSearchForm={handleSearchForm}
              />
            </Collapse>
          </div>
        </div>

        {/* SearchBox Desktop */}
        <div className={cx("fresnel-container", "fresnel-greaterThan-mdless")}>
          <HotelSearchBox
            className={cx("SearchPageDetail-searchBox")}
            cities={cities}
            control={control}
            setValue={setValue}
            handleSubmit={handleSubmit}
            handleSearchForm={handleSearchForm}
          />
        </div>

        <div>
          <div className={cx("SearchPageDetail-header")} ref={listRef}>
            <div className={cx("SearchPageDetail-title")}>
              <h4>Tìm thấy {totalRecords} kết quả</h4>
              <div>
                <ImageWrapper
                  src="https://res.cloudinary.com/dhnp8ymxv/image/upload/v1741405844/heading-border_jpgu2f.webp"
                  alt="section-header"
                  widthSvgWrapperImage={80}
                  heightSvgWrapperImage={8}
                />
              </div>
            </div>

            <div className="flex justify-between gap-6">
              {/* Filter In Mobile */}
              <div className={cx("SearchPageDetail-filterBtn")}>
                <Button type="button" normal outline>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      d="M1.91675 3.83333C1.91675 3.36662 1.91675 3.13327 2.00758 2.95501C2.08747 2.79821 2.21495 2.67072 2.37176 2.59083C2.55002 2.5 2.78337 2.5 3.25008 2.5H17.2501C17.7168 2.5 17.9501 2.5 18.1284 2.59083C18.2852 2.67072 18.4127 2.79821 18.4926 2.95501C18.5834 3.13327 18.5834 3.36662 18.5834 3.83333V4.39116C18.5834 4.61516 18.5834 4.72716 18.556 4.8313C18.5318 4.92359 18.4919 5.01103 18.438 5.0898C18.3772 5.17869 18.2926 5.25204 18.1233 5.39875L12.7935 10.0179C12.6242 10.1646 12.5396 10.238 12.4788 10.3269C12.425 10.4056 12.385 10.4931 12.3608 10.5854C12.3334 10.6895 12.3334 10.8015 12.3334 11.0255V15.382C12.3334 15.5449 12.3334 15.6264 12.3071 15.6969C12.2839 15.7591 12.2461 15.8149 12.197 15.8596C12.1413 15.9102 12.0657 15.9404 11.9143 16.001L9.08101 17.1343C8.77472 17.2568 8.62158 17.3181 8.49864 17.2925C8.39114 17.2702 8.29679 17.2063 8.23612 17.1148C8.16675 17.0101 8.16675 16.8452 8.16675 16.5153V11.0255C8.16675 10.8015 8.16675 10.6895 8.13938 10.5854C8.11512 10.4931 8.07519 10.4056 8.02134 10.3269C7.96056 10.238 7.87593 10.1646 7.70666 10.0179L2.37684 5.39875C2.20757 5.25204 2.12293 5.17869 2.06216 5.0898C2.0083 5.01103 1.96838 4.92359 1.94412 4.8313C1.91675 4.72716 1.91675 4.61516 1.91675 4.39116V3.83333Z"
                      stroke="#1D2939"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>

                  <div
                    className="label md"
                    onClick={() => setSidebarVisible(true)}
                  >
                    Bộ lọc
                  </div>

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
                </Button>
              </div>

              {/* Sort In Desktop */}
              <div className={cx("SearchPageDetail-sortBtn")}>
                <SearchSelectBox
                  stylesModule={styles}
                  baseClass="SearchPageDetail"
                  inputGroup
                  name="order"
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
                  defaultValue="Không sắp xếp"
                  items={[
                    {
                      label: "Giá thấp đến cao",
                      queryObject: {
                        orderBy: "default_price",
                        orderType: "asc",
                      },
                    },
                    {
                      label: "Giá cao đến thấp",
                      queryObject: {
                        orderBy: "default_price",
                        orderType: "desc",
                      },
                    },
                  ]}
                  fieldDropdown="label"
                  fieldSelectItem="queryObject"
                  onSelectItem={(value) => {
                    setValue("order", value);
                    setOrderBy(value?.orderBy);
                    setOrderType(value?.orderType);
                    handleGetData(
                      title,
                      cityId,
                      greaterDefaultPrice,
                      lowerDefaultPrice,
                      currentPage,
                      5,
                      checkedFeaturesList,
                      checkedStarList,
                      value?.orderBy,
                      value?.orderType
                    );
                  }}
                />
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className={cx("fresnel-container", "fresnel-lessThan-md")}>
            <div className="flex gap-32">
              {sideBarVisible && (
                <Sidebar
                  handleSelect={handleSelect}
                  handleReset={handleReset}
                  starOrder={starOrder}
                  checkedStarList={checkedStarList}
                  features={features}
                  checkedFeaturesList={checkedFeaturesList}
                  mobile
                  setSidebarVisible={setSidebarVisible}
                />
              )}

              <div>
                {loading ? (
                  <Skeleton active paragraph loading />
                ) : (
                  <List
                    baseClass="hotel"
                    data={data}
                    to="/tim-khach-san"
                    renderProductCard={(hotel) => (
                      <ProductCard
                        grid
                        BadgeImageWrapper={
                          <Badge
                            warning
                            BadgeSm
                            ContentXs
                            content={`${hotel.score_reviews} (${hotel.num_reviews}) đánh giá`}
                            svg={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M11.2443 4.17391C11.4758 3.50799 11.5916 3.17503 11.7627 3.08276C11.9108 3.00289 12.0892 3.00289 12.2373 3.08276C12.4084 3.17503 12.5242 3.50799 12.7556 4.17391L14.2859 8.5763C14.3518 8.76583 14.3847 8.86059 14.4441 8.93116C14.4965 8.9935 14.5634 9.04209 14.6389 9.07269C14.7244 9.10734 14.8247 9.10938 15.0253 9.11347L19.6851 9.20843C20.3899 9.22279 20.7423 9.22998 20.883 9.36423C21.0047 9.48042 21.0598 9.65005 21.0297 9.81559C20.9948 10.0069 20.7139 10.2198 20.1521 10.6458L16.438 13.4615C16.2782 13.5828 16.1982 13.6434 16.1494 13.7216C16.1063 13.7908 16.0808 13.8694 16.075 13.9506C16.0685 14.0426 16.0975 14.1387 16.1556 14.3307L17.5053 18.7918C17.7094 19.4666 17.8115 19.804 17.7273 19.9792C17.6544 20.1309 17.5101 20.2357 17.3433 20.2582C17.1506 20.2841 16.8613 20.0828 16.2826 19.6801L12.4569 17.018C12.2922 16.9034 12.2099 16.8461 12.1204 16.8239C12.0413 16.8042 11.9587 16.8042 11.8796 16.8239C11.7901 16.8461 11.7078 16.9034 11.5431 17.018L7.71738 19.6801C7.1387 20.0828 6.84936 20.2841 6.65666 20.2582C6.48988 20.2357 6.34559 20.1309 6.2727 19.9792C6.18848 19.804 6.29056 19.4666 6.49471 18.7918L7.84436 14.3307C7.90246 14.1387 7.93151 14.0426 7.92497 13.9506C7.91919 13.8694 7.89365 13.7908 7.85056 13.7216C7.80179 13.6434 7.72184 13.5828 7.56195 13.4615L3.84791 10.6458C3.28611 10.2198 3.00521 10.0069 2.97034 9.81559C2.94015 9.65005 2.99527 9.48042 3.11699 9.36423C3.25764 9.22998 3.61007 9.22279 4.31492 9.20843L8.97472 9.11347C9.17533 9.10938 9.27564 9.10734 9.3611 9.07269C9.43659 9.04209 9.50346 8.9935 9.5559 8.93116C9.61526 8.86059 9.6482 8.76583 9.71408 8.5763L11.2443 4.17391Z"
                                  stroke="var(--warning-base)"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            }
                            className={"ProductCard-imageWrapper-badge"}
                          />
                        }
                        BadgeLocation={
                          <Badge
                            BadgeDefault
                            BadgeSm
                            ContentXs
                            svg={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M5.7 15C4.03377 15.6353 3 16.5205 3 17.4997C3 19.4329 7.02944 21 12 21C16.9706 21 21 19.4329 21 17.4997C21 16.5205 19.9662 15.6353 18.3 15M12 9H12.01M18 9C18 13.0637 13.5 15 12 18C10.5 15 6 13.0637 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z"
                                  stroke="var(--gray-500)"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            }
                            content={hotel?.hotel?.cities?.name}
                            className={"ProductCard-location"}
                          />
                        }
                        imgSrc={hotel.thumbnail}
                        title={hotel.title}
                        price={`${formatMoney(hotel.default_price)}đ / phòng`}
                        // Render ra original price của hotel => Sẽ bổ sung sau vì thiếu api
                        originalPrice={
                          hotel.sale_prices === "0"
                            ? null
                            : `${formatMoney(hotel.sale_prices)}đ / phòng`
                        }
                        tags={hotel.features}
                        // iconDescription={
                        //   <svg
                        //     xmlns="http://www.w3.org/2000/svg"
                        //     width="20"
                        //     height="20"
                        //     viewBox="0 0 24 24"
                        //     fill="none"
                        //   >
                        //     <path
                        //       d="M20 3.5H4C3.20435 3.5 2.44129 3.81607 1.87868 4.37868C1.31607 4.94129 1 5.70435 1 6.5V19.5C1 19.7652 1.10536 20.0196 1.29289 20.2071C1.48043 20.3946 1.73478 20.5 2 20.5H6C6.16471 20.4991 6.32665 20.4576 6.47145 20.3791C6.61625 20.3006 6.73941 20.1876 6.83 20.05L8.54 17.5H15.46L17.17 20.05C17.2606 20.1876 17.3838 20.3006 17.5285 20.3791C17.6733 20.4576 17.8353 20.4991 18 20.5H22C22.2652 20.5 22.5196 20.3946 22.7071 20.2071C22.8946 20.0196 23 19.7652 23 19.5V6.5C23 5.70435 22.6839 4.94129 22.1213 4.37868C21.5587 3.81607 20.7956 3.5 20 3.5ZM21 18.5H18.54L16.83 16C16.7454 15.8531 16.6248 15.7302 16.4796 15.6428C16.3344 15.5553 16.1694 15.5062 16 15.5H8C7.83529 15.5009 7.67335 15.5424 7.52855 15.6209C7.38375 15.6994 7.26059 15.8124 7.17 15.95L5.46 18.5H3V13.5H21V18.5ZM7 11.5V10.5C7 10.2348 7.10536 9.98043 7.29289 9.79289C7.48043 9.60536 7.73478 9.5 8 9.5H10C10.2652 9.5 10.5196 9.60536 10.7071 9.79289C10.8946 9.98043 11 10.2348 11 10.5V11.5H7ZM13 11.5V10.5C13 10.2348 13.1054 9.98043 13.2929 9.79289C13.4804 9.60536 13.7348 9.5 14 9.5H16C16.2652 9.5 16.5196 9.60536 16.7071 9.79289C16.8946 9.98043 17 10.2348 17 10.5V11.5H13ZM21 11.5H19V10.5C19 9.70435 18.6839 8.94129 18.1213 8.37868C17.5587 7.81607 16.7956 7.5 16 7.5H14C13.2599 7.50441 12.5476 7.78221 12 8.28C11.4524 7.78221 10.7401 7.50441 10 7.5H8C7.20435 7.5 6.44129 7.81607 5.87868 8.37868C5.31607 8.94129 5 9.70435 5 10.5V11.5H3V6.5C3 6.23478 3.10536 5.98043 3.29289 5.79289C3.48043 5.60536 3.73478 5.5 4 5.5H20C20.2652 5.5 20.5196 5.60536 20.7071 5.79289C20.8946 5.98043 21 6.23478 21 6.5V11.5Z"
                        //       fill="var(--gray-600)"
                        //     ></path>
                        //   </svg>
                        // }
                        // Render ra số phòng của hotel => Sẽ bổ sung sau vì thiếu api
                        // contentDescription={`... phòng`}
                      />
                    )}
                  />
                )}

                {data.length > 0 && (
                  <Pagination
                    handlePageClick={handlePageClick}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    totalRecords={totalRecords}
                    displayNumberRecords={
                      <input
                        type="number"
                        max={20}
                        min={1}
                        value={records}
                        onChange={(e) => {
                          setRecords(e.target.value);
                          handleGetData(0, e.target.value);
                        }}
                      />
                    }
                  />
                )}
              </div>
            </div>
          </div>

          {/* Desktop */}
          <div
            className={cx("fresnel-container", "fresnel-greaterThan-mdless")}
          >
            <div className="flex gap-32">
              <Sidebar
                handleSelect={handleSelect}
                handleReset={handleReset}
                starOrder={starOrder}
                checkedStarList={checkedStarList}
                features={features}
                checkedFeaturesList={checkedFeaturesList}
              />

              <div>
                {loading ? (
                  <Skeleton active paragraph loading />
                ) : (
                  <List
                    baseClass="hotel"
                    data={data}
                    to="/tim-khach-san"
                    renderProductCard={(hotel) => (
                      <ProductCard
                        list
                        BadgeImageWrapper={
                          <Badge
                            warning
                            BadgeSm
                            ContentXs
                            content={`${hotel.score_reviews} (${hotel.num_reviews}) đánh giá`}
                            svg={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M11.2443 4.17391C11.4758 3.50799 11.5916 3.17503 11.7627 3.08276C11.9108 3.00289 12.0892 3.00289 12.2373 3.08276C12.4084 3.17503 12.5242 3.50799 12.7556 4.17391L14.2859 8.5763C14.3518 8.76583 14.3847 8.86059 14.4441 8.93116C14.4965 8.9935 14.5634 9.04209 14.6389 9.07269C14.7244 9.10734 14.8247 9.10938 15.0253 9.11347L19.6851 9.20843C20.3899 9.22279 20.7423 9.22998 20.883 9.36423C21.0047 9.48042 21.0598 9.65005 21.0297 9.81559C20.9948 10.0069 20.7139 10.2198 20.1521 10.6458L16.438 13.4615C16.2782 13.5828 16.1982 13.6434 16.1494 13.7216C16.1063 13.7908 16.0808 13.8694 16.075 13.9506C16.0685 14.0426 16.0975 14.1387 16.1556 14.3307L17.5053 18.7918C17.7094 19.4666 17.8115 19.804 17.7273 19.9792C17.6544 20.1309 17.5101 20.2357 17.3433 20.2582C17.1506 20.2841 16.8613 20.0828 16.2826 19.6801L12.4569 17.018C12.2922 16.9034 12.2099 16.8461 12.1204 16.8239C12.0413 16.8042 11.9587 16.8042 11.8796 16.8239C11.7901 16.8461 11.7078 16.9034 11.5431 17.018L7.71738 19.6801C7.1387 20.0828 6.84936 20.2841 6.65666 20.2582C6.48988 20.2357 6.34559 20.1309 6.2727 19.9792C6.18848 19.804 6.29056 19.4666 6.49471 18.7918L7.84436 14.3307C7.90246 14.1387 7.93151 14.0426 7.92497 13.9506C7.91919 13.8694 7.89365 13.7908 7.85056 13.7216C7.80179 13.6434 7.72184 13.5828 7.56195 13.4615L3.84791 10.6458C3.28611 10.2198 3.00521 10.0069 2.97034 9.81559C2.94015 9.65005 2.99527 9.48042 3.11699 9.36423C3.25764 9.22998 3.61007 9.22279 4.31492 9.20843L8.97472 9.11347C9.17533 9.10938 9.27564 9.10734 9.3611 9.07269C9.43659 9.04209 9.50346 8.9935 9.5559 8.93116C9.61526 8.86059 9.6482 8.76583 9.71408 8.5763L11.2443 4.17391Z"
                                  stroke="var(--warning-base)"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            }
                            className={"ProductCard-imageWrapper-badge"}
                          />
                        }
                        BadgeLocation={
                          <Badge
                            BadgeDefault
                            BadgeSm
                            ContentXs
                            svg={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M5.7 15C4.03377 15.6353 3 16.5205 3 17.4997C3 19.4329 7.02944 21 12 21C16.9706 21 21 19.4329 21 17.4997C21 16.5205 19.9662 15.6353 18.3 15M12 9H12.01M18 9C18 13.0637 13.5 15 12 18C10.5 15 6 13.0637 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z"
                                  stroke="var(--gray-500)"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            }
                            content={hotel?.hotel?.cities?.name}
                            className={"ProductCard-location"}
                          />
                        }
                        imgSrc={hotel.thumbnail}
                        title={hotel.title}
                        price={`${formatMoney(hotel.default_price)}đ / phòng`}
                        // Render ra original price của hotel => Sẽ bổ sung sau vì thiếu api
                        originalPrice={
                          hotel.sale_prices === "0"
                            ? null
                            : `${formatMoney(hotel.sale_prices)}đ / phòng`
                        }
                        tags={hotel.features}
                        // iconDescription={
                        //   <svg
                        //     xmlns="http://www.w3.org/2000/svg"
                        //     width="20"
                        //     height="20"
                        //     viewBox="0 0 24 24"
                        //     fill="none"
                        //   >
                        //     <path
                        //       d="M20 3.5H4C3.20435 3.5 2.44129 3.81607 1.87868 4.37868C1.31607 4.94129 1 5.70435 1 6.5V19.5C1 19.7652 1.10536 20.0196 1.29289 20.2071C1.48043 20.3946 1.73478 20.5 2 20.5H6C6.16471 20.4991 6.32665 20.4576 6.47145 20.3791C6.61625 20.3006 6.73941 20.1876 6.83 20.05L8.54 17.5H15.46L17.17 20.05C17.2606 20.1876 17.3838 20.3006 17.5285 20.3791C17.6733 20.4576 17.8353 20.4991 18 20.5H22C22.2652 20.5 22.5196 20.3946 22.7071 20.2071C22.8946 20.0196 23 19.7652 23 19.5V6.5C23 5.70435 22.6839 4.94129 22.1213 4.37868C21.5587 3.81607 20.7956 3.5 20 3.5ZM21 18.5H18.54L16.83 16C16.7454 15.8531 16.6248 15.7302 16.4796 15.6428C16.3344 15.5553 16.1694 15.5062 16 15.5H8C7.83529 15.5009 7.67335 15.5424 7.52855 15.6209C7.38375 15.6994 7.26059 15.8124 7.17 15.95L5.46 18.5H3V13.5H21V18.5ZM7 11.5V10.5C7 10.2348 7.10536 9.98043 7.29289 9.79289C7.48043 9.60536 7.73478 9.5 8 9.5H10C10.2652 9.5 10.5196 9.60536 10.7071 9.79289C10.8946 9.98043 11 10.2348 11 10.5V11.5H7ZM13 11.5V10.5C13 10.2348 13.1054 9.98043 13.2929 9.79289C13.4804 9.60536 13.7348 9.5 14 9.5H16C16.2652 9.5 16.5196 9.60536 16.7071 9.79289C16.8946 9.98043 17 10.2348 17 10.5V11.5H13ZM21 11.5H19V10.5C19 9.70435 18.6839 8.94129 18.1213 8.37868C17.5587 7.81607 16.7956 7.5 16 7.5H14C13.2599 7.50441 12.5476 7.78221 12 8.28C11.4524 7.78221 10.7401 7.50441 10 7.5H8C7.20435 7.5 6.44129 7.81607 5.87868 8.37868C5.31607 8.94129 5 9.70435 5 10.5V11.5H3V6.5C3 6.23478 3.10536 5.98043 3.29289 5.79289C3.48043 5.60536 3.73478 5.5 4 5.5H20C20.2652 5.5 20.5196 5.60536 20.7071 5.79289C20.8946 5.98043 21 6.23478 21 6.5V11.5Z"
                        //       fill="var(--gray-600)"
                        //     ></path>
                        //   </svg>
                        // }
                        // Render ra số phòng của hotel => Sẽ bổ sung sau vì thiếu api
                        // contentDescription={`... phòng`}
                      />
                    )}
                  />
                )}

                {data.length > 0 && (
                  <Pagination
                    handlePageClick={handlePageClick}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    totalRecords={totalRecords}
                    displayNumberRecords={
                      <input
                        type="number"
                        max={20}
                        min={1}
                        value={records}
                        onChange={(e) => {
                          setRecords(e.target.value);
                          handleGetData(
                            title,
                            cityId,
                            greaterDefaultPrice,
                            lowerDefaultPrice,
                            0,
                            e.target.value,
                            orderBy,
                            orderType
                          );
                        }}
                      />
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hotel;
