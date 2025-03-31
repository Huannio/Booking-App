import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "../Search.module.scss";
import NotFound from "~/components/NotFound/NotFound";

const cx = classNames.bind(styles);

function List({ baseClass, data, to, renderProductCard }) {
  return (
    <div
      className={cx(
        `SearchPageDetail-${baseClass}List`,
        "flex flex-col gap-32"
      )}
    >
      {data.length > 0 &&
        data?.map((baseClass) => (
          <Link key={baseClass.id} to={`${to}/${baseClass.slug}`}>
            {renderProductCard(baseClass)}
          </Link>
        ))}

      {data.length === 0 && (
        <div>
          <NotFound />
        </div>
      )}
    </div>
  );
}

List.propTypes = {
  baseClass: PropTypes.string,
  data: PropTypes.array,
  to: PropTypes.string,
  renderProductCard: PropTypes.func,
};

export default List;
