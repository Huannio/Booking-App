import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "../Search.module.scss";
import CheckBox from "~/components/CheckBox/CheckBox";
import Button from "~/components/Button";

const cx = classNames.bind(styles);
function Sidebar({
  handleReset,
  handleSelect,
  starOrder,
  checkedStarList,
  features,
  checkedFeaturesList,
  mobile = false,
  setSidebarVisible,
}) {
  return (
    <div
      className={cx("SearchPageDetail-sideBar", "flex flex-col", {
        "SearchPageDetail-sideBar-mobile": mobile,
      })}
    >
      <div className={cx("SearchPageDetail-sideBar-header")}>
        <div className="subheading md flex-grow">Lọc kết quả</div>

        <div className="flex gap-10 align-center">
          <Button type="button" small linkColor>
            <div className="label sm" onClick={handleReset}>
              Đặt lại
            </div>
          </Button>

          <Button
            type="button"
            className={cx("SearchPageDetail-apply-mb-btn")}
            small
            linkColor
            onClick={() => setSidebarVisible(false)}
          >
            <div className="label sm">Áp dụng</div>
          </Button>
        </div>
      </div>

      <div>
        <div className={cx("SearchPageDetail-filter-item")}>
          <label className="md">Xếp hạng sao</label>
          {starOrder?.map((star) => (
            <CheckBox
              key={star.id}
              id={star.id.toString()}
              title={star.name}
              onChange={handleSelect}
              value={star.value}
              checked={checkedStarList.includes(star.value)}
            />
          ))}
        </div>

        <div className={cx("SearchPageDetail-filter-item")}>
          <label className="md">Tiện ích</label>
          {features?.map((feature) => (
            <CheckBox
              key={feature.id}
              id={feature.id.toString()}
              title={feature.text}
              onChange={handleSelect}
              value={feature.id.toString()}
              checked={checkedFeaturesList.includes(feature.id.toString())}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  starOrder: PropTypes.array,
  features: PropTypes.array,
  handleSelect: PropTypes.func,
  handleReset: PropTypes.func,
  checkedStarList: PropTypes.array,
  checkedFeaturesList: PropTypes.array,
  mobile: PropTypes.bool,
  setSidebarVisible: PropTypes.func,
};

export default Sidebar;
