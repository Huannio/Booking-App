import { useContext, useEffect, useState, useCallback } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import axios from "~/utils/axios.config";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import styles from '../Home.module.scss';

const cx = classNames.bind(styles);

const CruiseSection = () => {
  const { setGlobalLoading } = useContext(LoadingContext);
  const [cruises, setCruises] = useState([]);

  // Hàm lấy dữ liệu từ API
  const getCruises = useCallback(async () => {
    setGlobalLoading(true);
    try {
      const { data } = await axios.get("/cruise"); 
      setCruises(data || []);
    } catch (error) {
      console.error("Error fetching cruises:", error);
    } finally {
      setGlobalLoading(false);
    }
  }, [setGlobalLoading]);

    useEffect(() => {
    getCruises();
  }, [getCruises]);

  return (
    <section className={cx("container", "home-section")}>
      <div className={cx("SectionHeader-sectionHeader", "SectionHeader-center")}>
        <div className={cx("SectionHeader-title")}>
          <h4>Du thuyền mới và phổ biến nhất</h4>
        </div>
        <label htmlFor="" className={cx("lg", "SectionHeader-description")}>
          Tận hưởng sự xa hoa và đẳng cấp tối đa trên du thuyền mới nhất và phổ biến nhất.
        </label>
        <div>
          <span style={{ boxSizing: "border-box", display: "inline-block", overflow: "hidden", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0, position: "relative", maxWidth: "100%" }}>
            <span style={{ boxSizing: "border-box", display: "block", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0, maxWidth: "100%" }}>
              <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2780%27%20height=%278%27/%3e" style={{ display: "block", maxWidth: "100%", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0 }} />
            </span>
            <img
              srcSet="/src/assets/images/heading-border.webp 1x, /src/assets/images/heading-border.webp 2x"
              src="/src/assets/images/heading-border.webp"
              alt="Heading Border"
              style={{ position: "absolute", inset: 0, boxSizing: "border-box", padding: 0, border: "none", margin: "auto", display: "block", width: 0, height: 0, minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%" }}
            />
          </span>
        </div>
      </div>

      <div className={cx("home-cardList")}>
        {cruises.map((cruise) => (
          <a href={`/cruise/${cruise.slug}`} key={cruise.id}>
            <div className={cx("card", "CategoryCard-categoryCard")}>
              <div className={cx("CategoryCard-imageWrapper")}>
                <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
                  <img
                    alt={cruise.name}
                    src={cruise.thumbnail}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className={cx("CategoryCard-body")}>
                <h6>{cruise.name}</h6>
                <div className={cx("CategoryCard-description")}>
                  <p className={cx("sm")}>
                    Hạ thuỷ {cruise.year} - Tàu vỏ {cruise.shell} - {cruise.cabin} phòng
                  </p>
                </div>
              </div>
              <div className={cx("CategoryCard-footer")}>
                <Button type="button" className={cx("btn", "btn-sm", "btn-outline")}>
                  <div className={cx("label", "sm")}>Xem ngay</div>
                </Button>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className={cx("PopularShips-action")}>
        <a href="/tim-du-thuyen">
          <Button type="button" className={cx("btn", "btn-normal", "btn-outline")}>
            <div className={cx("label", "md")}>Xem tất cả Du thuyền</div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="var(--gray-800, #1d2939)" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </a>
      </div>
    </section>
  );
};

export default CruiseSection;