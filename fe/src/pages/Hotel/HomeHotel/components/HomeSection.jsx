import classNames from "classnames/bind";
import Button from "~/components/Button";
import styles from "./HomeSection.module.scss";
import SectionHeader from "~/components/SectionHeader/SectionHeader";
import { Link } from "react-router-dom";
import CategoryCard from "~/components/Card/CategoryCard";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

const HomeSection = ({ cities }) => {
  return (
    <section className={cx("container", "Home-section")}>
      <SectionHeader
        title={<h4>Các điểm đến của Mixivivu</h4>}
        mainContent={
          "Trải nghiệm sự sang trọng và thư giãn tại Khách sạn: Hành trình đến thiên đường nghỉ dưỡng hoàn hảo"
        }
        column
        center
      />

      <div className={cx("Home-cardList")}>
        {cities?.map((city) => {
          if (city?.image != null) {
            return (
              <Link to={`/tim-du-thuyen?city  Id=${city.id}`} key={city.id}>
                <CategoryCard
                  title={city.name}
                  imgSrc={city.image}
                  alt={"mixivivu"}
                  button={
                    <Button small outline>
                      <div className="label sm">Xem ngay</div>
                    </Button>
                  }
                />
              </Link>
            );
          }
        })}
      </div>
    </section>
  );
};

HomeSection.propTypes = {
  cities: PropTypes.array,
};

export default HomeSection;
