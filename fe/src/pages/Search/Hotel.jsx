import classNames from "classnames/bind";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);
function Hotel() {
    return ( 
        <div className="section-bg">
            <div className={cx("SearchPageDetail-searchPage", "flex flex-col gap-80 container")}></div>
        </div>
     );
}

export default Hotel;