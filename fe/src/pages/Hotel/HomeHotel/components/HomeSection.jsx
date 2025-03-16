import { useContext, useEffect, useState, useCallback } from "react";
import { LoadingContext } from "~/components/Loading/Loading";
import classNames from "classnames/bind"; 
import Button from "~/components/Button";
import styles from '../Home.module.scss';
import { handleGetCityApi } from "~/api";

const cx = classNames.bind(styles); 

const HomeSection = () => {
  const { setGlobalLoading } = useContext(LoadingContext);
  const [city, setCity] = useState([]); 

  const getCity = useCallback(async () => {
    setGlobalLoading(true);
    try {
      const response = await handleGetCityApi();
      console.log("Full response:", response);
      
      const cityData = response?.city || [];
      
      setCity(cityData);
    } catch (error) {
      console.error("Lỗi khi lấy thành phố", error);
      setCity([]);
    } finally {
      setGlobalLoading(false);
    }
  }, [setGlobalLoading]);

  useEffect(() => {
    getCity();
  }, [getCity]);
  
  return (
    <section className={cx("container", "home-section")}>
      <div className={cx("SectionHeader-sectionHeader", "SectionHeader-center")}>
        <div className={cx("SectionHeader-title")}>
          <h4>Các điểm đến của Mixivivu</h4>
        </div>
        <label htmlFor="" className={cx("lg", "SectionHeader-description")}>
        Trải nghiệm sự sang trọng và thư giãn tại Khách sạn: Hành trình đến thiên đường nghỉ dưỡng hoàn hảo
        </label>
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

      <div className={cx("home-cardList")}>
        {/* Thêm kiểm tra là Array trước khi map */}
        {Array.isArray(city) && city.map((city) => (
          <a href={`/tim-khach-san/search?keyword=${city.name}`} key={city.id}>
            <div className={cx("card", "CategoryCard-categoryCard")}>
              <div className={cx("CategoryCard-imageWrapper")}>
                <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
                  <img
                    alt="mixivivu"
                    src={city.image}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className={cx("CategoryCard-body")}>
                <h6>{city.name}</h6>
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
    </section>
  );
};

export default HomeSection;