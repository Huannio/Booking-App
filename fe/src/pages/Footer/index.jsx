import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import config from "~/config";
export { default as AboutUs } from "./components/AboutUs";
export { default as Terms } from "./components/Term";
export { default as Privacy } from "./components/Privacy";
export { default as HowToUse } from "./components/HowToUse";
export { default as Payment } from "./components/Payment";
export { default as Contact } from "./components/Contact";
export { default as Rules } from "./components/Rules";
export { default as Question } from "./components/Question";


const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer>
      <div className={cx("footer-links")}>
        {config.intro.map((item, index) => (
          <Link to={item.href} key={index} className={cx("link")}>
            {item.content}
          </Link>
        ))}
      </div>
    </footer>
  );
}

export default Footer;