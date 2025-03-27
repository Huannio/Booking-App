import classNames from "classnames/bind";
import Button from "~/components/Button";
import styles from "./HomeSection.module.scss";
import SectionHeader from "~/components/SectionHeader/SectionHeader";
import { Link } from "react-router-dom";
import CategoryCard from "~/components/Card/CategoryCard";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

const HomeSection = ({ cruiseCategory }) => {
  return (
    <section className={cx("container", "Home-section")}>
      <SectionHeader
        title={<h4>Các điểm đến của Mixivivu</h4>}
        mainContent={
          "Khám phá vẻ đẹp tuyệt vời của Du thuyền Hạ Long: Hành trình đến thiên đường thiên nhiên"
        }
        column
        center
      />

      <div className={cx("Home-cardList")}>
        {cruiseCategory?.map((category) => (
          <Link
            to={`/tim-du-thuyen?categoryId=${category?.id}`}
            key={category?.id}
          >
            <CategoryCard
              title={category?.name}
              imgSrc={category?.image}
              alt={"mixivivu"}
              button={
                <Button small outline>
                  <div className="label sm">Xem ngay</div>
                </Button>
              }
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

HomeSection.propTypes = {
  cruiseCategory: PropTypes.array,
};

export default HomeSection;
