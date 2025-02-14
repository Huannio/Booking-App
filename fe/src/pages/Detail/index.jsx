import classNames from "classnames/bind";
import styles from './Detail.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

import ImageWrapper from "~/components/ImageWrapper";
import images from "~/assets/images";

const cx = classNames.bind(styles);
function Detail() {
    return (
        
        <div className={cx("ShipDetail-ship-detail", " flex container")}>
            <div className={cx("ShipDetail-tabss")}>
            <>
                <div className={cx("Tabs-tabs-header")}>
                    <link to="#" className={cx("features")}>
                        <button className={cx("Tabs-tabItem", "Tabs-sm")}>
                            <label className={cx("Tabs-tabItem-label")}> Đặc điểm</label>
                        </button>
                    </link>
                </div>
            </>
            </div>
        </div>
        
    )
}

export default Detail;