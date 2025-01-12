import classNames from "classnames/bind";
import styles from "./Login.module.scss";
const cx = classNames.bind(styles);
function Login() {
    return ( 
        <div className={cx("Login-container")}>
            <div className={cx("container")}>
                <div className={cx("modalLogin")}>
                    
                </div>
            </div>
        </div>
    );
}

export default Login;