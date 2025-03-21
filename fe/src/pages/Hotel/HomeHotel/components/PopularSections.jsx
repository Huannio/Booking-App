import { useContext, useEffect, useState, useCallback } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import styles from "../Home.module.scss";
import { handleGetHotelsApi } from "~/api";

const cx = classNames.bind(styles);

const HotelSection = () => {
  const [hotel, setHotel] = useState([]);
  const { setGlobalLoading } = useContext(LoadingContext);

  const getHotel = useCallback(async () => {
    setGlobalLoading(true);
    const response = await handleGetHotelsApi();
    setHotel(response.hotel);
    setGlobalLoading(false);
  }, [setGlobalLoading]);

  useEffect(() => {
    getHotel();
  }, [getHotel]);

  return (
    <section className={cx("popularSections")}>
    <div className={cx("container", "popularSections-section")}>
      <div className={cx("SectionHeader-sectionHeader")}>
        <div className={cx("SectionHeader-title")}>
          <h4>Du thuyền mới</h4>
          <h4>và phổ biến nhất</h4>
          <div>
            <span style = {{boxSizing: "border-box",display: "inline-block",overflow: "hidden",width: "initial",height: "initial",background: "none",opacity: 1,border: 0,margin: 0,padding: 0,position: "relative",maxWidth: "100%",}} >
              <span style = {{boxSizing: "border-box", display: "block", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0, maxWidth: "100%",}} >
                <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2780%27%20height=%278%27/%3e" style={{display: "block", maxWidth: "100%", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0,}} />
              </span>  
                <img 
                  srcSet="/src/assets/images/heading-border.webp 1x, /src/assets/images/heading-border.webp 2x"
                  src="/src/assets/images/heading-border.webp"
                  alt="Heading Border"
                  style={{ position: "absolute", inset: 0, boxSizing: "border-box", padding: 0, border: "none", margin: "auto", display: "block", width: 0, height: 0, minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%",}} />
            </span>
          </div>
        </div>
        <label htmlFor="" className={cx("lg", "SectionHeader-description")}>
          Tận hưởng sự xa hoa và đẳng cấp tối đa trên du thuyền mới nhất và phổ biến nhất.
        </label>
      </div>

      <div className={cx("PopularShips-cardList")}>
        {hotel.slice(0, 6).map((hotel) => {
          const product = hotel.product[0];

          return (
            <a href={`/du-thuyen/${product.slug}`} key={hotel.id}>
              <div className={cx("card", "ProductCard-grid")}>
                <div className={cx("ProductCard-imageWrapper")}>
                <div className={cx("ProductCard-imageWrapper-image")} style={{ width: "352px", height: "216px", position: "relative", overflow: "hidden", }}>
                  <img
                    alt={product?.title}
                    src={product?.thumbnail}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={cx("Badge-warning", "Badge-sm", "Badge-container", "ProductCard-imageWrapper-badge")}>
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
                    />
                  </svg>
                  <label className="xs">{product?.score_reviews} ({product?.num_reviews}) đánh giá</label>
                </div>
                </div>
                <div className={cx("ProductCard-cardContent")}>
                <div className={cx("ProductCard-body")}>
                  <div className={cx("Badge-default", "Badge-sm", "Badge-container", "ProductCard-location")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"> 
                    <path d="M5.7 15C4.03377 15.6353 3 16.5205 3 17.4997C3 19.4329 7.02944 21 12 21C16.9706 21 21 19.4329 21 17.4997C21 16.5205 19.9662 15.6353 18.3 15M12 9H12.01M18 9C18 13.0637 13.5 15 12 18C10.5 15 6 13.0637 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z" stroke="var(--gray-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <label className="xs">{hotel.cities.name}</label>
                  </div>

                  <p className={cx("ProductCard-title", "md", "subheading")}>
                  {product?.title}
                  </p>
                  <div className={cx("ProductCard-description")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M20 3.5H4C3.20435 3.5 2.44129 3.81607 1.87868 4.37868C1.31607 4.94129 1 5.70435 1 6.5V19.5C1 19.7652 1.10536 20.0196 1.29289 20.2071C1.48043 20.3946 1.73478 20.5 2 20.5H6C6.16471 20.4991 6.32665 20.4576 6.47145 20.3791C6.61625 20.3006 6.73941 20.1876 6.83 20.05L8.54 17.5H15.46L17.17 20.05C17.2606 20.1876 17.3838 20.3006 17.5285 20.3791C17.6733 20.4576 17.8353 20.4991 18 20.5H22C22.2652 20.5 22.5196 20.3946 22.7071 20.2071C22.8946 20.0196 23 19.7652 23 19.5V6.5C23 5.70435 22.6839 4.94129 22.1213 4.37868C21.5587 3.81607 20.7956 3.5 20 3.5ZM21 18.5H18.54L16.83 16C16.7454 15.8531 16.6248 15.7302 16.4796 15.6428C16.3344 15.5553 16.1694 15.5062 16 15.5H8C7.83529 15.5009 7.67335 15.5424 7.52855 15.6209C7.38375 15.6994 7.26059 15.8124 7.17 15.95L5.46 18.5H3V13.5H21V18.5ZM7 11.5V10.5C7 10.2348 7.10536 9.98043 7.29289 9.79289C7.48043 9.60536 7.73478 9.5 8 9.5H10C10.2652 9.5 10.5196 9.60536 10.7071 9.79289C10.8946 9.98043 11 10.2348 11 10.5V11.5H7ZM13 11.5V10.5C13 10.2348 13.1054 9.98043 13.2929 9.79289C13.4804 9.60536 13.7348 9.5 14 9.5H16C16.2652 9.5 16.5196 9.60536 16.7071 9.79289C16.8946 9.98043 17 10.2348 17 10.5V11.5H13ZM21 11.5H19V10.5C19 9.70435 18.6839 8.94129 18.1213 8.37868C17.5587 7.81607 16.7956 7.5 16 7.5H14C13.2599 7.50441 12.5476 7.78221 12 8.28C11.4524 7.78221 10.7401 7.50441 10 7.5H8C7.20435 7.5 6.44129 7.81607 5.87868 8.37868C5.31607 8.94129 5 9.70435 5 10.5V11.5H3V6.5C3 6.23478 3.10536 5.98043 3.29289 5.79289C3.48043 5.60536 3.73478 5.5 4 5.5H20C20.2652 5.5 20.5196 5.60536 20.7071 5.79289C20.8946 5.98043 21 6.23478 21 6.5V11.5Z"
                      fill="var(--gray-600)"
                    />
                  </svg>
                    <p className={cx("sm")}>
                       {hotel.year || "N/A"} phòng
                    </p>
                  </div>
                </div>
                </div>
                <div className={cx("ProductCard-footer")}>
                  <p
                    className={cx("ProductCard-price", "subheading md")}
                    style={{ color: "var(--primary-dark, #0E4F4F)" }}
                  >
                    {product.default_price || "N/A"} đ / khách
                  </p>
                  <Button type="button" className={cx("btn", "btn-sm", "btn-primary")}>
                    <div className={cx("label", "sm")}>Đặt ngay</div>
                  </Button>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <div className={cx("PopularShips-action")}>
        <a href="/tim-du-thuyen">
          <Button type="button" className={cx("btn", "btn-normal", "btn-outline")}>
            <div className={cx("label", "md")}>Xem tất cả Du thuyền</div>
            <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
              stroke="var(--gray-800, #1d2939)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          </Button>
        </a>
      </div>
    </div>
    </section>
  );
};

export default HotelSection;
