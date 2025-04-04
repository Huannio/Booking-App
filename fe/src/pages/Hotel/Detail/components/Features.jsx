import classNames from "classnames/bind";
import PropTypes from "prop-types";

import ImageWrapper from "~/components/ImageWrapper";
import styles from "../Hotel.module.scss";
import SectionHeader from "~/components/SectionHeader/SectionHeader";

const cx = classNames.bind(styles);

function Features({ id, features, shortDescProducts }) {
  return (
    <div className={cx("flex flex-col gap-40", "ShipDetail-features")} id={id}>
      <SectionHeader title={<h4>Đặc điểm nổi bật</h4>} />

      <div className={cx("ShipDetail-overview")}>
        {features?.map((feature) => (
          <div key={feature.id} className="flex gap-8 align-center">
            <div>
              <ImageWrapper
                src={feature.icon}
                alt={feature.text}
                widthSvgWrapperImage={24}
                heightSvgWrapperImage={24}
              />
            </div>
            <label className="md">{feature.text}</label>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-24">
        {shortDescProducts?.map((description) => (
          <div key={description.id} className={cx("flex align-center gap-8")}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 12.6111L8.92308 17.5L20 6.5"
                  stroke="var(--primary-base)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <label className="md">{description.description}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

Features.propTypes = {
  id: PropTypes.string,
  features: PropTypes.array,
  shortDescProducts: PropTypes.array,
};

export default Features;
