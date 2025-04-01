import { useForm } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import { Skeleton } from "antd";
import { useSearchParams } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import Button from "~/components/Button";
import { SearchSelectBox, CruiseSearchBox } from "~/components/SearchBox";
import {
  handleSearchShipsApi,
  handleGetCruiseCategoryApi,
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

function Cruise() {
  let [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);

  const [sideBarVisible, setSidebarVisible] = useState(false);

  const [checkedFeaturesList, setCheckedFeaturesList] = useState([]);
  const [checkedStarList, setCheckedStarList] = useState([]);

  const [features, setFeatures] = useState([]);
  const [cruiseCategory, setCruiseCategory] = useState([]);
  const [data, setData] = useState([]);

  const [records, setRecords] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [orderBy, setOrderBy] = useState("id");
  const [orderType, setOrderType] = useState("ASC");

  const { control, setValue, handleSubmit } = useForm();
  const getCruiseCategory = async () => {
    const res = await handleGetCruiseCategoryApi();
    setCruiseCategory(res.cruiseCategory);
  };

  const getFeatures = async () => {
    const res = await handleGetAllFeaturesApi();
    setFeatures(res.features);
  };

  const handleGetData = useCallback(
    async (
      title,
      categoryId,
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
      const res = await handleSearchShipsApi(
        title,
        categoryId,
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
  const [categoryId, setCategoryId] = useState(searchParams.get("categoryId"));
  const [greaterDefaultPrice, setGreaterDefaultPrice] = useState(
    searchParams.get("greater_defaultPrice")
  );
  const [lowerDefaultPrice, setLowerDefaultPrice] = useState(
    searchParams.get("lower_defaultPrice")
  );

  const handleSearchForm = (data) => {
    setTitle(data?.title);
    setCategoryId(data?.categoryId);
    setGreaterDefaultPrice(data?.price?.greater_defaultPrice);
    setLowerDefaultPrice(data?.price?.lower_defaultPrice);
    handleGetData(
      data?.title,
      data?.categoryId,
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
      categoryId,
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
    getCruiseCategory();
    getFeatures();
  }, []);

  useEffect(() => {
    handleGetData(
      title,
      categoryId,
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
              <CruiseSearchBox
                className={cx("SearchPageDetail-searchBox-mb")}
                cruiseCategory={cruiseCategory}
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
          <CruiseSearchBox
            className={cx("SearchPageDetail-searchBox")}
            cruiseCategory={cruiseCategory}
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
                      categoryId,
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
                    baseClass="ship"
                    data={data}
                    to="/du-thuyen"
                    renderProductCard={(ship) => (
                      <ProductCard
                        grid
                        imgSrc={ship?.thumbnail}
                        title={ship.title}
                        price={`${formatMoney(ship?.default_price)}đ / khách`}
                        originalPrice={
                          ship.sale_prices === "0"
                            ? null
                            : `${formatMoney(ship.sale_prices)}đ / khách`
                        }
                        BadgeImageWrapper={
                          <Badge
                            warning
                            BadgeSm
                            ContentXs
                            content={`${ship.score_reviews} (${ship.num_reviews}) đánh giá`}
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
                            content={ship?.cruise?.cruise_category?.name}
                            className={"ProductCard-location"}
                          />
                        }
                        iconDescription={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M3.62 17.28C3.71813 17.5267 3.91022 17.7242 4.15402 17.8292C4.39782 17.9343 4.67335 17.9381 4.92 17.84C5.16665 17.7419 5.36422 17.5498 5.46924 17.306C5.57426 17.0622 5.57813 16.7867 5.48 16.54L4.36 13.72L11 12.25V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V12.25L19.64 13.72L18.52 16.54C18.4713 16.6621 18.4471 16.7926 18.4489 16.9241C18.4507 17.0556 18.4784 17.1854 18.5304 17.3061C18.5824 17.4269 18.6577 17.5362 18.7521 17.6278C18.8464 17.7194 18.9578 17.7915 19.08 17.84C19.1978 17.8866 19.3233 17.9103 19.45 17.91C19.6503 17.9102 19.846 17.8502 20.0118 17.7379C20.1776 17.6256 20.3059 17.4661 20.38 17.28L21.93 13.37C21.9832 13.2348 22.0063 13.0896 21.9977 12.9445C21.989 12.7994 21.9489 12.658 21.88 12.53C21.8132 12.4025 21.7196 12.2909 21.6057 12.2029C21.4918 12.1149 21.3602 12.0525 21.22 12.02L18 11.31V7C18 6.73478 17.8946 6.48043 17.7071 6.29289C17.5196 6.10536 17.2652 6 17 6H15V3C15 2.73478 14.8946 2.48043 14.7071 2.29289C14.5196 2.10536 14.2652 2 14 2H10C9.73478 2 9.48043 2.10536 9.29289 2.29289C9.10536 2.48043 9 2.73478 9 3V6H7C6.73478 6 6.48043 6.10536 6.29289 6.29289C6.10536 6.48043 6 6.73478 6 7V11.31L2.78 12C2.63976 12.0325 2.5082 12.0949 2.39429 12.1829C2.28038 12.2709 2.18682 12.3825 2.12 12.51C2.05113 12.638 2.01098 12.7794 2.00234 12.9245C1.99371 13.0696 2.0168 13.2148 2.07 13.35L3.62 17.28ZM11 4H13V6H11V4ZM8 8H16V10.86L12.22 10H12.12H12H11.88H11.78L8 10.86V8ZM20.71 19.28C20.3591 19.3875 20.0232 19.5387 19.71 19.73C19.3914 19.9163 19.029 20.0145 18.66 20.0145C18.291 20.0145 17.9286 19.9163 17.61 19.73C16.9173 19.3392 16.1354 19.1339 15.34 19.1339C14.5446 19.1339 13.7627 19.3392 13.07 19.73C12.7471 19.9141 12.3817 20.011 12.01 20.011C11.6383 20.011 11.2729 19.9141 10.95 19.73C10.2566 19.3411 9.47499 19.1368 8.68 19.1368C7.88501 19.1368 7.10336 19.3411 6.41 19.73C6.09143 19.9163 5.72904 20.0145 5.36 20.0145C4.99096 20.0145 4.62857 19.9163 4.31 19.73C3.99683 19.5387 3.66087 19.3875 3.31 19.28C3.17694 19.2327 3.03537 19.2141 2.89461 19.2255C2.75385 19.2368 2.61709 19.2778 2.49334 19.3459C2.36958 19.4139 2.26163 19.5073 2.1766 19.6201C2.09157 19.7328 2.03138 19.8623 2 20C1.92535 20.2533 1.95389 20.5258 2.07941 20.7581C2.20493 20.9904 2.41724 21.1636 2.67 21.24C2.87136 21.2946 3.06347 21.3788 3.24 21.49C3.84671 21.846 4.53657 22.0357 5.24 22.04C5.9706 22.0401 6.68823 21.8469 7.32 21.48C7.71198 21.2638 8.15234 21.1504 8.6 21.1504C9.04766 21.1504 9.48803 21.2638 9.88 21.48C10.5073 21.8387 11.2174 22.0274 11.94 22.0274C12.6626 22.0274 13.3727 21.8387 14 21.48C14.392 21.2638 14.8323 21.1504 15.28 21.1504C15.7277 21.1504 16.168 21.2638 16.56 21.48C17.1798 21.8499 17.8882 22.0453 18.61 22.0453C19.3318 22.0453 20.0402 21.8499 20.66 21.48C20.8365 21.3688 21.0286 21.2846 21.23 21.23C21.3631 21.2031 21.4893 21.1493 21.6009 21.0721C21.7126 20.9948 21.8073 20.8956 21.8793 20.7805C21.9514 20.6654 21.9992 20.5368 22.02 20.4027C22.0407 20.2685 22.0339 20.1315 22 20C21.9682 19.8647 21.9086 19.7374 21.8249 19.6265C21.7412 19.5155 21.6352 19.4232 21.5138 19.3554C21.3925 19.2877 21.2583 19.246 21.1199 19.233C20.9815 19.22 20.8419 19.236 20.71 19.28Z"
                              fill="var(--gray-600)"
                            ></path>
                          </svg>
                        }
                        contentDescription={`Hạ thủy ${ship?.cruise?.year} - Tàu vỏ ${ship?.cruise?.shell} - ${ship?.cruise?.cabin} phòng`}
                        tags={ship.features}
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
                    baseClass="ship"
                    data={data}
                    to="/du-thuyen"
                    renderProductCard={(ship) => (
                      <ProductCard
                        list
                        imgSrc={ship?.thumbnail}
                        title={ship.title}
                        price={`${formatMoney(ship?.default_price)}đ / khách`}
                        originalPrice={
                          ship.sale_prices === "0"
                            ? null
                            : `${formatMoney(ship.sale_prices)}đ / khách`
                        }
                        BadgeImageWrapper={
                          <Badge
                            warning
                            BadgeSm
                            ContentXs
                            content={`${ship.score_reviews} (${ship.num_reviews}) đánh giá`}
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
                            content={ship?.cruise?.cruise_category?.name}
                            className={"ProductCard-location"}
                          />
                        }
                        iconDescription={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M3.62 17.28C3.71813 17.5267 3.91022 17.7242 4.15402 17.8292C4.39782 17.9343 4.67335 17.9381 4.92 17.84C5.16665 17.7419 5.36422 17.5498 5.46924 17.306C5.57426 17.0622 5.57813 16.7867 5.48 16.54L4.36 13.72L11 12.25V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V12.25L19.64 13.72L18.52 16.54C18.4713 16.6621 18.4471 16.7926 18.4489 16.9241C18.4507 17.0556 18.4784 17.1854 18.5304 17.3061C18.5824 17.4269 18.6577 17.5362 18.7521 17.6278C18.8464 17.7194 18.9578 17.7915 19.08 17.84C19.1978 17.8866 19.3233 17.9103 19.45 17.91C19.6503 17.9102 19.846 17.8502 20.0118 17.7379C20.1776 17.6256 20.3059 17.4661 20.38 17.28L21.93 13.37C21.9832 13.2348 22.0063 13.0896 21.9977 12.9445C21.989 12.7994 21.9489 12.658 21.88 12.53C21.8132 12.4025 21.7196 12.2909 21.6057 12.2029C21.4918 12.1149 21.3602 12.0525 21.22 12.02L18 11.31V7C18 6.73478 17.8946 6.48043 17.7071 6.29289C17.5196 6.10536 17.2652 6 17 6H15V3C15 2.73478 14.8946 2.48043 14.7071 2.29289C14.5196 2.10536 14.2652 2 14 2H10C9.73478 2 9.48043 2.10536 9.29289 2.29289C9.10536 2.48043 9 2.73478 9 3V6H7C6.73478 6 6.48043 6.10536 6.29289 6.29289C6.10536 6.48043 6 6.73478 6 7V11.31L2.78 12C2.63976 12.0325 2.5082 12.0949 2.39429 12.1829C2.28038 12.2709 2.18682 12.3825 2.12 12.51C2.05113 12.638 2.01098 12.7794 2.00234 12.9245C1.99371 13.0696 2.0168 13.2148 2.07 13.35L3.62 17.28ZM11 4H13V6H11V4ZM8 8H16V10.86L12.22 10H12.12H12H11.88H11.78L8 10.86V8ZM20.71 19.28C20.3591 19.3875 20.0232 19.5387 19.71 19.73C19.3914 19.9163 19.029 20.0145 18.66 20.0145C18.291 20.0145 17.9286 19.9163 17.61 19.73C16.9173 19.3392 16.1354 19.1339 15.34 19.1339C14.5446 19.1339 13.7627 19.3392 13.07 19.73C12.7471 19.9141 12.3817 20.011 12.01 20.011C11.6383 20.011 11.2729 19.9141 10.95 19.73C10.2566 19.3411 9.47499 19.1368 8.68 19.1368C7.88501 19.1368 7.10336 19.3411 6.41 19.73C6.09143 19.9163 5.72904 20.0145 5.36 20.0145C4.99096 20.0145 4.62857 19.9163 4.31 19.73C3.99683 19.5387 3.66087 19.3875 3.31 19.28C3.17694 19.2327 3.03537 19.2141 2.89461 19.2255C2.75385 19.2368 2.61709 19.2778 2.49334 19.3459C2.36958 19.4139 2.26163 19.5073 2.1766 19.6201C2.09157 19.7328 2.03138 19.8623 2 20C1.92535 20.2533 1.95389 20.5258 2.07941 20.7581C2.20493 20.9904 2.41724 21.1636 2.67 21.24C2.87136 21.2946 3.06347 21.3788 3.24 21.49C3.84671 21.846 4.53657 22.0357 5.24 22.04C5.9706 22.0401 6.68823 21.8469 7.32 21.48C7.71198 21.2638 8.15234 21.1504 8.6 21.1504C9.04766 21.1504 9.48803 21.2638 9.88 21.48C10.5073 21.8387 11.2174 22.0274 11.94 22.0274C12.6626 22.0274 13.3727 21.8387 14 21.48C14.392 21.2638 14.8323 21.1504 15.28 21.1504C15.7277 21.1504 16.168 21.2638 16.56 21.48C17.1798 21.8499 17.8882 22.0453 18.61 22.0453C19.3318 22.0453 20.0402 21.8499 20.66 21.48C20.8365 21.3688 21.0286 21.2846 21.23 21.23C21.3631 21.2031 21.4893 21.1493 21.6009 21.0721C21.7126 20.9948 21.8073 20.8956 21.8793 20.7805C21.9514 20.6654 21.9992 20.5368 22.02 20.4027C22.0407 20.2685 22.0339 20.1315 22 20C21.9682 19.8647 21.9086 19.7374 21.8249 19.6265C21.7412 19.5155 21.6352 19.4232 21.5138 19.3554C21.3925 19.2877 21.2583 19.246 21.1199 19.233C20.9815 19.22 20.8419 19.236 20.71 19.28Z"
                              fill="var(--gray-600)"
                            ></path>
                          </svg>
                        }
                        contentDescription={`Hạ thủy ${ship?.cruise?.year} - Tàu vỏ ${ship?.cruise?.shell} - ${ship?.cruise?.cabin} phòng`}
                        tags={ship.features}
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
                            categoryId,
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

export default Cruise;
